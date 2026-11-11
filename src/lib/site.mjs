import { getLocale, localePath } from './locale.mjs';
export const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
export const url = (path = '', locale = getLocale()) => `${base}/${localePath(path.replace(/^\//, ''),locale)}`;
export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export const profile = { name: 'Caio Teixeira', fullName: 'Caio Teixeira Ladeira', email: 'caiotladeira@gmail.com', github: 'https://github.com/caiotlad', linkedin: 'https://www.linkedin.com/in/caio-teixeira-cc/' };
export function icon(name = 'arrow', size = 20) {
  const paths = {
    pause:'M9 5v14M15 5v14', search:'M21 21l-4.7-4.7M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z', close:'M6 6l12 12M6 18 18 6', up:'M12 20V4m-6 6 6-6 6 6',
    arrow:'M7 17 17 7M7 7h10v10', right:'M4 12h16m-6-6 6 6-6 6', down:'M12 4v16m-6-6 6 6 6-6',
    code:'m8 7-5 5 5 5m8-10 5 5-5 5m-2-14-4 18', mail:'M4 5h16v14H4zM4 6l8 7 8-7',
    copy:'M9 9h11v11H9zM15 9V4H4v11h5', check:'m5 12 4 4L19 6', plus:'M12 5v14M5 12h14',
    globe:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z',
    layers:'m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5', spark:'m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.arrow}"/></svg>`;
}
