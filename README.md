# STRUDEL
Simplified Truncated User Directed Endpoint Layer (STRUDEL)

Try to predict the outcome of premier league better than everyone else, and try your best to beat the 
[APPLE](https://github.com/benjaminjellis/APPLE) prediction engine

Join in at [BeatTheBot.co.uk](beatthebot.co.uk).


# Architecture

## STRUDEL
STRU*DEL* is the Vue-based web front end, designed to support some small level of orchestration 
(i.e. automated prediction management), but primarily as a tool for data entry/management and the "bug-the-user" 
prediction reminder/notification service (*Name TBD*).

The most common use for STRUDEL will be the main Prediction Entry screen where users will be able to make predictions 
for the current/next weeks Premier League fixtures. STRUDEL can then be used to view other users predictions, compare 
those predictions against its supported automated prediction engines, and view analysis' of said predictions in it's 
Analytics Dashboard.


## ENKEL
ENKEL is the internal/external-facing api layer designed to support interoperability with external services such as the 
[APPLE](https://github.com/benjaminjellis/APPLE) prediction engine. ENKEL also functions as the back-end for the STRUDEL
front end, providing support for entity CRUD operations via the STRU*DAL* component.

### API Documentation
For basic API Documentation, [see ENKEL's README here](ENKEL/README.md).
Advanced documentation can be found using Swagger.
 

## STRUDAL
STRU*DAL* encompasses the Data Access Layer used to ENKEL. Currently it is implemented using TypeORM. This component
 of the system manages all CRUD operations, both simple and composite, as well as Entity definitions and the DAO's for
 said entities. All database operations happen through STRUDAL.
 
