import Vue from "vue";
import moment from "moment";
import { AnyEntity } from "@/ENKEL/entity/EntityHelper";

export class BaseComponent extends Vue {
  callENKEL(url: string, method = "GET", body: string | null = null): Promise<Response> {
    console.log("Calling ENKEL");
    return fetch(url, {
      method: method,
      body: body,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.$store.state.AuthModule.token}` }
    })
      .then(res => {
        if (res.status === 401 || res.status === 500) {
          console.error(
            `Attempted to call ${url} with a token (${this.$store.state.AuthModule.token}) that wasn't accepted, status ${res.status}`
          );
          this.$store.commit("invalidateToken");
          this.$router.push("/login");
          throw "Invalid token";
        }

        return res;
      })
      .catch(error => {
        console.error(error);
        return Promise.reject();
      });
  }

  showMessage({ message, variant, delay }: { message: string; variant?: string; delay?: number }) {
    this.$bvToast.toast(message, {
      noCloseButton: true,
      variant: variant,
      autoHideDelay: delay ?? 3000,
      toaster: "b-toaster-top-right",
      href: "#"
    });
  }

  isAdmin(): boolean {
    return this.$store?.state?.AuthModule?.user?.userRole === "A";
  }

  formatFixtureResult(fixtureResult: string): string {
    switch (fixtureResult) {
      case "H":
        return "Home Win";
      case "A":
        return "Away Win";
      case "D":
        return "Draw";
      default:
        return "-";
    }
  }

  prettyFormatDate(date: string | Date): string {
    return moment(date).format("ddd, Do MMM");
  }

  prettyFormatTime(time: string | Date): string {
    return moment(time, "HH:mm").format("HH:mm");
  }

  hasNativeDatePicker() {
    const el = document.createElement("input");
    const invalidVal = "foo"; // Any value that is not a date
    el.setAttribute("type", "date");
    el.setAttribute("value", invalidVal);
    // A supported browser will modify this if it is a true date field
    return el.value !== invalidVal;
  }
}

export type FormEntity = AnyEntity & NewEntity & { previousPrediction: string };
export type NewEntity = { new: boolean };

export type BootstrapTableField = {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatter?: ((value: string) => string) | ((value: any) => string) | ((value: AnyEntity[]) => string);
  sortable?: boolean;
  sortByFormatted?: boolean;
  variant?: "active" | "success" | "info" | "warning" | "danger";
};
