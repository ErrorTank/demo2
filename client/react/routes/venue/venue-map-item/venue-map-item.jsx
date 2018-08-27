import React from "react";
import {DropZone} from "../../../common/drop-zone/drop-zone";
import {Toggle} from "../../../common/toggle/toggle";

const uploadPlaceholder = (
    <p className="upload-placeholder">Drop image here to upload</p>
);

export class VenueMapItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
        let {info, onDelete, onChange} = this.props;
        console.log(info);
        return(
            <div className="venue-map-item">
                <DropZone
                    imagePreview={info.image}
                    placeholder={uploadPlaceholder}
                    className="upload-new"
                    onChange={this.addNewMap}
                />
                <input type="text"
                       className="venue-map-name"
                       value={info.name}
                       onChange={(e) => onChange({...info, name: e.target.value})}
                       placeholder="Venue Map Name"
                />
                <div className="footer">
                    <div className="left">
                        <div className="title">Default Seat Map</div>
                        <Togglexx
                            value={info.default ? "on" : "off"}
                            label={{
                                on: "Yes",
                                off: "No"
                            }}
                        />
                    </div>
                    <div className="right">
                        <div className="title">{info.boundaries ? 'Interactive' : info.gm_map_data ? "GM Map" : 'Static Map'}</div>
                        <span className="del-map"
                              onClick={onDelete}
                        >
                            Delete this venue map
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
