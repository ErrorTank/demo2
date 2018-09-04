import React from "react";
import createBrowserHistory from "history/createBrowserHistory"

export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {VenueListRoute} from "./routes/venue/venue-list-route";
import {VenueEditRoute} from "./routes/venue/edit/venue-edit-route";
import {ModalsRegistry} from "./common/modals/modals";
import {VenueNewRoute} from "./routes/venue/new/venue-new-route";

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
                        <Route render={(props) => <Redirect to="/venue-list"/>}/>
                    </Switch>

                </Router>
            </div>
        );
    }
}
