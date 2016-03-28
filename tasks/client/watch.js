import gulp from 'gulp';
import browserSync from 'browser-sync';
import {path, tasks} from './const';

const TS = path.DEV + '**/*.ts';
const CSS = path.DEV + '**/*.css';
const LESS = path.DEV + '**/*.less';
const HTML = path.DEV + '**/*.html';

gulp.task(tasks.CLIENT_BROWSER_SYNC, () => {
  return browserSync.reload();
});

gulp.task(tasks.CLIENT_WATCH, [tasks.CLIENT_LESS, tasks.CLIENT_BUILD_TS_DEV, tasks.CLIENT_BROWSER_SYNC], () => {
  browserSync({proxy: "http://localhost:3333", reloadDelay: 1000});

  let _watchable = [];
  //_watchable.push(TS);
  //_watchable.push(LESS);
  //_watchable.push(CSS);
  //_watchable.push(HTML);

  return gulp.watch(_watchable, [tasks.CLIENT_LESS, tasks.CLIENT_BUILD_TS_DEV, tasks.CLIENT_BROWSER_SYNC]);
});
