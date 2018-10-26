import React from "react";
import {VenueForm} from "../../../../venue/venue-form/venue-from";

export class NewVenueMapForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    render(){
      let {onChange, info} = this.props;
      console.log(info)
        return(
            <div>
              <VenueForm
                info={info}
                maps={[info]}
                onChange={({info, venuesMaps}) => onChange(info)}
                deleteVenueMap={() => console.log("delete")}
                canDelete={false}
              />
            </div>
        );
    }
}
