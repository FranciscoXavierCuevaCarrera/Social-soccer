import { type App } from "@wasp.sh/spec";

export const head: App["head"] = [
  "<link rel='icon' href='/favicon.ico' />",

  "<meta name='description' content='Social Soccer: organiza partidos, encuentra jugadores, gestiona árbitros y consulta tus estadísticas en un solo lugar.' />",
  "<meta name='author' content='Social Soccer' />",
  "<meta name='keywords' content='fútbol, fútbol amateur, partidos, jugadores, árbitros, estadísticas, Social Soccer' />",

  "<meta property='og:type' content='website' />",
  "<meta property='og:title' content='Social Soccer' />",
  "<meta property='og:site_name' content='Social Soccer' />",
  "<meta property='og:description' content='Organiza partidos, encuentra jugadores, gestiona árbitros y consulta tus estadísticas en un solo lugar.' />",

  "<meta name='twitter:card' content='summary_large_image' />",
  "<meta name='twitter:title' content='Social Soccer' />",
  "<meta name='twitter:description' content='La comunidad del fútbol amateur para organizar, jugar y competir.' />",
];
