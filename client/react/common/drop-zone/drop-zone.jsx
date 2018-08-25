import React from "react";

export class DropZone extends React.Component{
    constructor(props){
        super(props);
        this.state={
            uploading: false
        };
    };

    handleUpload = file => {
        this.setState({uploading: true});
        this.props.onChange(file).then(
            () => this.setState({uploading: false}),
            () => this.setState({uploading: false})
        )
    };

    render(){
        let {className, placeholder, imagePreview} = this.props;
        return(
            <div className={`drop-zone ${className} ${imagePreview ? "has-img" : ""}`}
                 onClick={() => this.inputElem.click()}
            >
                {imagePreview && (
                    <img src={imagePreview}
                         className="venue-map-img"
                    />
                )

                }
                <div className="in-side">
                    {placeholder}
                </div>
                <input
                    className="upload-input"
                    type="file"
                    onChange={this.handleUpload}
                    accept="image/*"
                    style={{display: "none"}}
                    ref={elem => this.inputElem = elem}
                />
            </div>
        );
    }
}
