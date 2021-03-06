import React, {Fragment} from "react";
import {VenueMapItem} from "../venue-map-item/venue-map-item";
import {DropZone} from "../../../common/drop-zone/drop-zone";
import {uploadApi} from "../../../../api/common/app/upload-api";
import {modals} from "../../../common/modals/modals";
import {InsertNameModal} from "../../../common/modals/insert-name-modal/insert-name-modal";

export function uploadNewImage(file, type = "new") {
  return new Promise((resolve, reject) => {
    function callUpload(name = null) {
      return uploadApi.upload({
        [new Date().getTime()]: file
      }).then(({returnData}) => {
        resolve({file: returnData, name: name});
      });
    }

    if (type === "new") {
      const modal = modals.openModal({
        content: (
          <InsertNameModal
            onConfirm={(name) => confirm(name)}
            onDismiss={() => {
              modal.dismiss();
              reject();
            }}
          />
        ),
      });

      function confirm(name) {
        modal.close();
        return callUpload(name);
      }
    } else if (type === "update") {
      callUpload();
    }
  })
}

export class VenueEditMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDropzone: props.maps.length === 0
    };
  };


  addNewMap = file => uploadNewImage(file)
    .then(({file, name}) => {
        let {onChange, maps, info} = this.props;
        let newMaps = {
          default: false,
          name: name,
          image: file,
          venue: info,
          timestamp: Date.now()
        };
        onChange(maps.concat(newMaps))
      }
      , () => Promise.reject())
    .then(() => {
      this.setState({openDropZone: false});
      return Promise.resolve();
    });

  handleChangeMap = (index, data) => {
    let def = data.default;
    let newMapsArr = this.props.maps.map((each, i) => {
      if (i === index) {
        return data;
      }
      if (def === true) {
        return {...each, default: false}
      }
      return each;
    });
    this.props.onChange(newMapsArr);
  };

  render() {
    let {openDropzone} = this.state;
    let {maps, deleteVenueMap, onChange} = this.props;
    return (
      <div className="venue-edit-map">
        <div className="edit-map-header">
                    <span>
                        Seat Map
                    </span>
          {

          }
          <i className="fas fa-plus-circle"
             onClick={() => this.setState({openDropzone: !openDropzone})}
          />
        </div>
        <div className="body">
          {(openDropzone || maps.length === 0) && (
            <div className="drop-zone-wrapper">
              <DropZone
                imagePreview={null}
                placeholder={uploadPlaceholder}
                className="upload-new"
                onChange={(e) => {
                  console.log("dasd")
                  return this.addNewMap(e);
                }}
              />
              <i className="fas fa-times"
                 onClick={() => this.setState({openDropzone: false})}
              />
            </div>
          )}
          <div className="maps-list">
            {maps.map((each, i) => (
              <VenueMapItem
                info={each}
                key={i}
                onDelete={() => deleteVenueMap(each, i)}
                onChange={(data) => this.handleChangeMap(i, data)}
              />
            ))

            }
          </div>
        </div>
      </div>
    );
  }
}

const uploadPlaceholder = (
  <div className="upload-placeholder">
    <p>Drop here to upload</p>
    <p>or</p>
    <p>Select Image file</p>
  </div>
);
