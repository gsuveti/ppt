import gulp from 'gulp';
import less from 'gulp-less';
import {path, tasks} from './const';


const LESS = path.DEV + '**/*.less';

gulp.task(tasks.CLIENT_LESS, () => {
  return gulp.src(LESS)
    .pipe(less())
    .pipe(gulp.dest(path.DEV));
});

