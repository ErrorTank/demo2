import _ from "lodash"

let PromiseSerial = funcs =>
    funcs.reduce((promise, func) =>
            promise.then(result => func(result).then((_result) => result.concat(_.isArray(_result) ? [_result] : _result))),
        Promise.resolve([]));

export {
    PromiseSerial
}
