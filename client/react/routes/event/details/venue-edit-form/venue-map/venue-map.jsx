import React from "react";
import {CommonSelect} from "../../../../../common/common-select/common-select";
import {DropZone} from "../../../../../common/drop-zone/drop-zone";
import {uploadNewImage} from "../../../../venue/venue-edit-map/venue-edit-map";

export class VenueMap extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showUpload: false
        };
    };
    changeMap = file => uploadNewImage(file, "new")
        .then(({file, name}) => {
                let {onAddMap, venue} = this.props;
                onAddMap({
                    default: false,
                    name: name,
                    image: file,
                    venue: venue
                })
            }
            , () => Promise.reject())
        .then(() => {
            return Promise.resolve();
        });

    render(){
        let {showUpload} = this.state;
        let {onChange, maps, venueMap} = this.props;

        return(
            <div className="venue-map">
                {showUpload ? (
                    <div className="upload-zone">
                        <i className="fas fa-times sw-icon"
                           onClick={() => this.setState({showUpload: false})}
                        />
                        <DropZone
                            placeholder={(
                                <p className="upload-placeholder">Drop image here to upload</p>
                            )}
                            className="upload-new"
                            onChange={(file) => this.changeMap(file).then(() => this.setState({showUpload: false}))}
                        />
                    </div>
                ) : (
                    venueMap && (
                        <div className="row p-0">
                            <div className="col-5 left-panel">
                                <div>
                                    <CommonSelect
                                        className={`maps event-form-section`}
                                        onChange={val => onChange(val)}
                                        list={maps}
                                        displayAs={val => {
                                            return val.name
                                        }}
                                        value={venueMap || ""}
                                        label="Venue Map"
                                        compare={(target, value) => target.id === value.id}
                                    />
                                </div>
                                <button className="btn btn-primary upload-btn"
                                        onClick={() => this.setState({showUpload: true})}
                                >
                                    Upload new
                                </button>
                            </div>
                            <div className="col-7 right-panel">
                                <div className="img-contain">
                                    <img src={venueMap.image}/>
                                </div>
                            </div>
                        </div>
                    )
                )

                }

            </div>
        );
    }
}
