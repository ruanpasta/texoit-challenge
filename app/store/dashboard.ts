import { signal } from '@preact/signals-react';
import { MovieByYear } from '~/models/MovieWinnerByYear';
import { ProducersIntervalWin } from '~/models/ProducersIntervalWin';
import { StudioWinCount } from '~/models/StudiosWinCount';
import { WinnersByYear } from '~/models/WinnersByYear';

export interface DashboardState {
  years: WinnersByYear | undefined;
  studios: StudioWinCount | undefined;
  producers: ProducersIntervalWin | undefined;
  movieByYear: MovieByYear | undefined;
}

export const dashboardState = signal<DashboardState>({} as DashboardState);

// export const hasDashboardState = computed(() => {
//   console.log('dhheeeererree -------------', dashboardState.value.years)
//   return (
//     dashboardState.value &&
//     dashboardState.value.years &&
//     dashboardState.value.studios &&
//     dashboardState.value.producers &&
//     dashboardState.value.movieByYear
//   );
// });
