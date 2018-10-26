import React from "react";
import createBrowserHistory from "history/createBrowserHistory"

export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {VenueListRoute} from "./routes/venue/venue-list-route";
import {VenueEditRoute} from "./routes/venue/edit/venue-edit-route";
import {ModalsRegistry} from "./common/modals/modals";
import {VenueNewRoute} from "./routes/venue/new/venue-new-route";
import {EventListRoute} from "./routes/event/event-list-route";
import {EventNewRoute} from "./routes/event/new/event-new-route";
import {EventEditRoute} from "./routes/event/edit/event-edit-route";
import {DiscountListRoute} from "./routes/discount/list/discount-list";
import {DiscountEditRoute} from "./routes/discount/edit/discount-edit";

export class MainRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div id="main-route">
                <ModalsRegistry/>
                <Router
                    history={customHistory}
                >
                    <Switch>
                        <Route exact path="/venue/:venueID" component={VenueEditRoute}/>
                        <Route exact path="/venue-list" component={VenueListRoute}/>
                        <Route exact path="/venue-new" component={VenueNewRoute}/>
                        <Route exact path="/venue/:venueID" component={VenueEditRoute}/>
                        <Route exact path="/events" component={EventListRoute}/>
                        <Route exact path="/event-new" component={EventNewRoute}/>
                        <Route exact path="/event/:eventID/:step" component={EventEditRoute}/>
                        <Route exact path="/discounts" component={DiscountListRoute}/>
                        <Route exact path="/discount/:discountID/:step" component={DiscountEditRoute}/>
                        <Route render={(props) => <Redirect to="/events"/>}/>
                    </Switch>

                </Router>
            </div>
        );
    }
}
