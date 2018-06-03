const gulp = require("gulp");
const spawn = require('child_process').spawn;

const stylusCompiler =  {
    watch: (desk) =>{
        require("./compile-stylus").createCompiler(desk).watch();
    },
    compile: (desk) =>{
        return Promise.all([
            require("./compile-stylus").createCompiler(desk).compile(),
        ]);
    }
};

gulp.task("dev", ()=>{
    stylusCompiler.watch("./dev/assets/css");
    if (!/^win/.test(process.platform)) { // linux
        spawn("webpack", ["--watch"], {stdio: "inherit"});
    } else {
        spawn('cmd', ['/s', "/c", "webpack", "--w"], {stdio: "inherit"});
    }
});

