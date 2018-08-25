import React from "react";
import createBrowserHistory from "history/createBrowserHistory"

export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {VenueListRoute} from "./routes/venue/venue-list-route";
import {VenueEditRoute} from "./routes/venue/edit/venue-edit-route";
import {ModalsRegistry} from "./common/modals/modals";

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
                        <Route exact path="/venue/:venueID" render={props => <VenueEditRoute {...props}/>}/>
                        <Route exact path="/venue-list" component={VenueListRoute}/>
                        <Route render={(props) => <Redirect to="/venue-list"/>}/>
                    </Switch>

                </Router>
            </div>
        );
    }
}
