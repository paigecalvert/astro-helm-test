// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://paigecalvert.github.io',
	base: '/astro-helm-test',
	integrations: [
		starlight({
			title: 'My Docs',
			defaultLocale: 'root',
			locales: {
			  // English docs in `src/content/docs/en/` but served at root
			  root: {
			    label: 'English',
			    lang: 'en',
			  },
			  es: {
				label: 'Español',
				lang: 'es',
			  },
		    },
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					translations: {
						es: 'Guías'
					},
					items: [
						{ 
							label: 'Example Guide', 
							slug: 'guides/example',
							translations: {
								es: 'Guía de Ejemplo'
							}
						},
					],
				},
				{
					label: 'Reference',
					translations: {
						es: 'Referencia'
					},
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
