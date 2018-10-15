import React, {Fragment} from "react";
import {orgApi} from "../../../../../../api/common/app/org-api";
import {Logo} from "../../../../../common/logo/logo";
import _ from "lodash"

export class OrgSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgs: [],
            keyword: ""
        };
        orgApi.getBriefs().then(orgs => this.setState({orgs}))
    };

    getFilteredList = (orgs, kw) => {
        return orgs.filter((item) => item.name.toLowerCase().indexOf(kw.toLowerCase()) > -1)
    };


    onSelectOrg = (org) => {
        if (org) {
            orgApi.getOrg(org.id).then(detail => this.props.onChange(detail))

        }
    };

    componentWillReceiveProps =(nextProps) =>{

        if(nextProps.value && !_.isEqual(nextProps.value, this.props.value)){
            this.setState({
                keyword: nextProps.value.name
            });
            //this.onSelectOrg(nextProps.value);
        }
    };

    handleSearch = (e) => {
        this.setState({keyword: e.target.value}, () => {
            const {keyword, orgs} = this.state;
            if (keyword.length >= 3) {
                const orgFilter = this.getFilteredList(orgs, keyword);

                if (orgFilter.length === 1) {
                    this.onSelectOrg(orgFilter[0]);
                }
            }
            this.onSelectOrg(null);
        });
    };

    clearSelector = () => {
        this.props.onChange(null);
        this.setState({
            keyword: ''
        })
    };

    render() {
        const {orgs, keyword} = this.state;
        const {value} = this.props;

        let list = value ?
            orgs.filter(each => each.id.toLowerCase() === value.id.toLowerCase()) :
            (keyword && keyword.length >= 3) ?
                this.getFilteredList(orgs, keyword) : orgs;
        console.log(list)
        return (
            <div className="org-selector">
                {orgs && (
                    <Fragment>
                        <div className="org-search">
                            <div className="label">
                                Organization
                            </div>
                            <div className="search-field">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    onChange={this.handleSearch}
                                    value={keyword}
                                />
                                {keyword && (
                                    <span className="clear-data"
                                          onClick={this.clearSelector}
                                    >
                                        Clear selection
                                    </span>
                                )}
                            </div>

                        </div>

                        <div className="org-list">
                            {list.map((org, i) => (
                                <div className="org-content"
                                     key={i}
                                >
                                    <Logo
                                        imgSrc={org.logo_url}
                                        onClick={() => this.onSelectOrg(org)}
                                        className={`org-logo ${value ? org.id.toLowerCase() === value.id.toLowerCase() ? "active" :"" : ""}`}
                                        label={org.name}
                                    />
                                </div>
                            ))

                            }
                        </div>
                    </Fragment>
                )}
            </div>
        );
    }
}
