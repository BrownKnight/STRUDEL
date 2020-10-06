import Vue from "vue";
import moment from "moment";

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

  showEntityAlert(shownForTime: number, message: string, variant: string) {
    this.$bvToast.toast(message, {
      noCloseButton: true,
      variant: variant,
      autoHideDelay: shownForTime * 1000,
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
}
