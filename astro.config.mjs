// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightVersions from 'starlight-versions';

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
			  fr: {
				label: 'Français',
				lang: 'fr',
			  },
			  pt: {
				label: 'Português',
				lang: 'pt',
			  },
		    },
			plugins: [
				starlightVersions({
					versions: [
						{ slug: 'v1.0', label: 'v1.0' }
					]
				}),
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: 'Guides',
					translations: {
						es: 'Guías',
						fr: 'Guides',
						pt: 'Guias'
					},
					items: [
						{ 
							label: 'Example Guide', 
							slug: 'guides/example',
							translations: {
								es: 'Guía de Ejemplo',
								fr: 'Guide d\'Exemple',
								pt: 'Guia de Exemplo'
							}
						},
					],
				},
				{
					label: 'Reference',
					translations: {
						es: 'Referencia',
						fr: 'Référence',
						pt: 'Referência'
					},
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Test',
					translations: {
						es: 'Prueba',
						fr: 'Test',
						pt: 'Teste'
					},
					autogenerate: { directory: 'test' },
				},
			],
		}),
	],
});
