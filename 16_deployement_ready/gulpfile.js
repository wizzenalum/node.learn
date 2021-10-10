const gulp = require('gulp');
//for all types
const rev = require('gulp-rev');
const del = require('del');

// for css
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');

// for images
// const imagemin = require('gulp-imagemin');
// for js
const uglify = require('gulp-uglify-es').default;





gulp.task('css',function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));
    
    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


// gulp.task('images', function(done){
//     console.log('compressing images...');
//     gulp.src('./assets/**/*.jpg')
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });


// // empty the public/assets directory
gulp.task('clean:assets', function(done){
    console.log("cleaning public assets...")
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js'), function(done){
    console.log('Building assets');
    done();
});

