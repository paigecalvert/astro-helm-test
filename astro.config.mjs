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
			title: 'Helm Docs with Astro and Starlight',
			logo: {
				src: './src/assets/helm-logo.svg',
			  },
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
			  uk: {
				label: 'Українська',
				lang: 'uk',
			  },
			  ja: {
				label: '日本語',
				lang: 'ja',
			  },
		    },
			plugins: [
				starlightVersions({
					versions: [
						{ slug: 'v1.0', label: 'v1.0' },
						{ slug: 'v2.0', label: 'v2.0' }
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
						pt: 'Guias',
						uk: 'Посібники',
						ja: 'ガイド'
					},
					items: [
						{ 
							label: 'Example Guide', 
							slug: 'guides/example',
							translations: {
								es: 'Guía de Ejemplo',
								fr: 'Guide d\'Exemple',
								pt: 'Guia de Exemplo',
								uk: 'Приклад посібника',
								ja: 'ガイドの例'
							}
						},
					],
				},
				{
					label: 'Reference',
					translations: {
						es: 'Referencia',
						fr: 'Référence',
						pt: 'Referência',
						uk: 'Довідка',
						ja: 'リファレンス'
					},
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Test',
					translations: {
						es: 'Prueba',
						fr: 'Test',
						pt: 'Teste',
						uk: 'Тест',
						ja: 'テスト'
					},
					autogenerate: { directory: 'test' },
				},
			],
		}),
	],
});
