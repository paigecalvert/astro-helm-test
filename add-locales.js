import fs from 'fs';
import path from 'path';

// Translation data
const translations = {
  fr: {
    welcome: 'Bienvenue sur Starlight',
    description: 'Commencez à construire votre site de documentation avec Starlight.',
    tagline: 'Félicitations pour avoir configuré un nouveau projet Starlight !',
    exampleGuide: 'Guide d\'Exemple',
    readDocs: 'Lire la documentation Starlight',
    nextSteps: 'Prochaines étapes',
    updateContent: 'Mettre à jour le contenu',
    updateContentDesc: 'Éditez `src/content/docs/fr/index.mdx` pour voir les changements sur cette page.',
    addContent: 'Ajouter du nouveau contenu',
    addContentDesc: 'Ajoutez des fichiers Markdown ou MDX à `src/content/docs/fr` pour créer de nouvelles pages.',
    configureSite: 'Configurer votre site',
    configureSiteDesc: 'Éditez votre `sidebar` et autres configurations dans `astro.config.mjs`.',
    readDocsCard: 'Lire la documentation',
    readDocsCardDesc: 'Apprenez-en plus dans [la Documentation Starlight](https://starlight.astro.build/).',
    guideTitle: 'Guide d\'Exemple',
    guideDesc: 'Un guide dans mon nouveau site de documentation Starlight.',
    guideContent: 'Les guides mènent un utilisateur à travers une tâche spécifique qu\'il veut accomplir, souvent avec une séquence d\'étapes.\nÉcrire un bon guide nécessite de réfléchir à ce que vos utilisateurs essaient de faire.',
    refTitle: 'Référence d\'Exemple',
    refDesc: 'Une page de référence dans mon nouveau site de documentation Starlight.',
    refContent: 'Les pages de référence sont idéales pour décrire le fonctionnement des choses de manière concise et claire.\nMoins préoccupées par raconter une histoire ou aborder un cas d\'usage spécifique, elles doivent donner des détails complets sur ce que vous documentez.',
    furtherReading: 'Lecture supplémentaire',
    topicPrefix: 'Sujet'
  },
  pt: {
    welcome: 'Bem-vindo ao Starlight',
    description: 'Comece a construir seu site de documentação com Starlight.',
    tagline: 'Parabéns por configurar um novo projeto Starlight!',
    exampleGuide: 'Guia de Exemplo',
    readDocs: 'Leia a documentação do Starlight',
    nextSteps: 'Próximos passos',
    updateContent: 'Atualizar conteúdo',
    updateContentDesc: 'Edite `src/content/docs/pt/index.mdx` para ver as mudanças nesta página.',
    addContent: 'Adicionar novo conteúdo',
    addContentDesc: 'Adicione arquivos Markdown ou MDX a `src/content/docs/pt` para criar novas páginas.',
    configureSite: 'Configurar seu site',
    configureSiteDesc: 'Edite sua `sidebar` e outras configurações em `astro.config.mjs`.',
    readDocsCard: 'Ler a documentação',
    readDocsCardDesc: 'Saiba mais na [Documentação do Starlight](https://starlight.astro.build/).',
    guideTitle: 'Guia de Exemplo',
    guideDesc: 'Um guia no meu novo site de documentação Starlight.',
    guideContent: 'Os guias levam um usuário através de uma tarefa específica que eles querem realizar, frequentemente com uma sequência de passos.\nEscrever um bom guia requer pensar sobre o que seus usuários estão tentando fazer.',
    refTitle: 'Referência de Exemplo',
    refDesc: 'Uma página de referência no meu novo site de documentação Starlight.',
    refContent: 'As páginas de referência são ideais para descrever como as coisas funcionam de forma concisa e clara.\nMenos preocupadas em contar uma história ou abordar um caso de uso específico, elas devem dar detalhes abrangentes sobre o que você está documentando.',
    furtherReading: 'Leitura adicional',
    topicPrefix: 'Tópico'
  }
};

// Function to generate lorem ipsum content
function generateLoremIpsum() {
  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
  ];
  
  const numParagraphs = Math.floor(Math.random() * 3) + 3;
  const selectedParagraphs = [];
  
  for (let i = 0; i < numParagraphs; i++) {
    selectedParagraphs.push(paragraphs[Math.floor(Math.random() * paragraphs.length)]);
  }
  
  return selectedParagraphs.join('\n\n');
}

// Function to ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Function to create homepage
function createHomepage(locale, version = '') {
  const t = translations[locale];
  const versionPath = version ? `/${version}` : '';
  const slugPrefix = version ? `${locale}/${version}` : locale;
  
  return `---
title: ${t.welcome}
description: ${t.description}
template: splash
hero:
  tagline: ${t.tagline}
  image:
    file: ${version ? '../../../../' : '../../../'}assets${versionPath}/houston.webp
  actions:
    - text: ${t.exampleGuide}
      link: /${locale}${versionPath}/guides/example/
      icon: right-arrow
    - text: ${t.readDocs}
      link: https://starlight.astro.build
      icon: external
      variant: minimal
${version ? `slug: ${slugPrefix}` : ''}
---

import { Card, CardGrid } from '@astrojs/starlight/components';

## ${t.nextSteps}

<CardGrid stagger>
  <Card title="${t.updateContent}" icon="pencil">
    ${t.updateContentDesc}
  </Card>

  <Card title="${t.addContent}" icon="add-document">
    ${t.addContentDesc}
  </Card>

  <Card title="${t.configureSite}" icon="setting">
    ${t.configureSiteDesc}
  </Card>

  <Card title="${t.readDocsCard}" icon="open-book">
    ${t.readDocsCardDesc}
  </Card>
</CardGrid>`;
}

// Function to create guide
function createGuide(locale, version = '') {
  const t = translations[locale];
  const slugPrefix = version ? `${locale}/${version}` : locale;
  
  return `---
title: ${t.guideTitle}
description: ${t.guideDesc}
${version ? `slug: ${slugPrefix}/guides/example` : ''}
---

${t.guideContent}

## ${t.furtherReading}

${version ? '*' : '-'} Read [about how-to guides](https://diataxis.fr/how-to-guides/) in the Diátaxis framework`;
}

// Function to create reference
function createReference(locale, version = '') {
  const t = translations[locale];
  const slugPrefix = version ? `${locale}/${version}` : locale;
  
  return `---
title: ${t.refTitle}
description: ${t.refDesc}
${version ? `slug: ${slugPrefix}/reference/example` : ''}
---

${t.refContent}

## ${t.furtherReading}

${version ? '*' : '-'} Read [about reference](https://diataxis.fr/reference/) in the Diátaxis framework`;
}

// Function to create test page
function createTestPage(pageNum, locale, version = '') {
  const t = translations[locale];
  const paddedNum = pageNum.toString().padStart(3, '0');
  const title = `${t.topicPrefix} ${paddedNum}`;
  const description = `Description du ${t.topicPrefix.toLowerCase()} ${paddedNum} pour la documentation de test`;
  const slugPrefix = version ? `${locale}/${version}` : locale;
  
  return `---
title: ${title}
description: ${description}
${version ? `slug: ${slugPrefix}/test/topic-${paddedNum}` : ''}
---

# ${title}

${generateLoremIpsum()}

## Section 1

${generateLoremIpsum()}

## Section 2

${generateLoremIpsum()}`;
}

// Function to create i18n file
function createI18nFile(locale) {
  const t = translations[locale];
  
  return JSON.stringify({
    "skipLink.label": locale === 'fr' ? "Aller au contenu" : "Ir para o conteúdo",
    "search.label": locale === 'fr' ? "Rechercher" : "Pesquisar",
    "search.ctrlKey": "Ctrl",
    "search.cancelLabel": locale === 'fr' ? "Annuler" : "Cancelar",
    "search.devWarning": locale === 'fr' 
      ? "La recherche n'est disponible que dans les builds de production. \nEssayez de build et prévisualiser le site pour le tester localement."
      : "A pesquisa só está disponível em builds de produção. \nTente fazer build e visualizar o site para testá-lo localmente.",
    "themeSelect.accessibleLabel": locale === 'fr' ? "Sélectionner le thème" : "Selecionar tema",
    "themeSelect.dark": locale === 'fr' ? "Sombre" : "Escuro",
    "themeSelect.light": locale === 'fr' ? "Clair" : "Claro",
    "themeSelect.auto": locale === 'fr' ? "Automatique" : "Automático",
    "languageSelect.accessibleLabel": locale === 'fr' ? "Sélectionner la langue" : "Selecionar idioma",
    "menuButton.accessibleLabel": locale === 'fr' ? "Menu" : "Menu",
    "sidebarNav.accessibleLabel": locale === 'fr' ? "Principal" : "Principal",
    "tableOfContents.onThisPage": locale === 'fr' ? "Sur cette page" : "Nesta página",
    "tableOfContents.overview": locale === 'fr' ? "Aperçu" : "Visão geral",
    "i18n.untranslatedContent": locale === 'fr' 
      ? "Ce contenu n'est pas encore disponible dans votre langue."
      : "Este conteúdo ainda não está disponível no seu idioma.",
    "page.editLink": locale === 'fr' ? "Modifier la page" : "Editar página",
    "page.lastUpdated": locale === 'fr' ? "Dernière mise à jour :" : "Última atualização:",
    "page.previousLink": locale === 'fr' ? "Précédent" : "Anterior",
    "page.nextLink": locale === 'fr' ? "Suivant" : "Próximo",
    "page.draft": locale === 'fr' 
      ? "Ce contenu est un brouillon et ne sera pas inclus dans les builds de production."
      : "Este conteúdo é um rascunho e não será incluído nos builds de produção.",
    "404.text": locale === 'fr' 
      ? "Page non trouvée. Vérifiez l'URL ou essayez d'utiliser la barre de recherche."
      : "Página não encontrada. Verifique a URL ou tente usar a barra de pesquisa.",
    "aside.note": "Note",
    "aside.tip": locale === 'fr' ? "Conseil" : "Dica",
    "aside.caution": locale === 'fr' ? "Attention" : "Cuidado",
    "aside.danger": locale === 'fr' ? "Danger" : "Perigo",
    "fileTree.directory": locale === 'fr' ? "Répertoire" : "Diretório",
    "builtWithStarlight.label": locale === 'fr' ? "Construit avec Starlight" : "Construído com Starlight"
  }, null, 2);
}

// Main function
function addLocales() {
  const locales = ['fr', 'pt'];
  
  console.log('🚀 Adding French and Portuguese locales...\n');
  
  locales.forEach(locale => {
    console.log(`📁 Creating ${locale.toUpperCase()} content...`);
    
    // Create directory structure
    const paths = [
      `src/content/docs/${locale}`,
      `src/content/docs/${locale}/v1.0`,
      `src/content/docs/${locale}/guides`,
      `src/content/docs/${locale}/reference`,
      `src/content/docs/${locale}/test`,
      `src/content/docs/${locale}/v1.0/guides`,
      `src/content/docs/${locale}/v1.0/reference`,
      `src/content/docs/${locale}/v1.0/test`
    ];
    
    paths.forEach(ensureDir);
    
    // Create homepage files
    fs.writeFileSync(`src/content/docs/${locale}/index.mdx`, createHomepage(locale));
    fs.writeFileSync(`src/content/docs/${locale}/v1.0/index.mdx`, createHomepage(locale, 'v1.0'));
    
    // Create guide files
    fs.writeFileSync(`src/content/docs/${locale}/guides/example.md`, createGuide(locale));
    fs.writeFileSync(`src/content/docs/${locale}/v1.0/guides/example.md`, createGuide(locale, 'v1.0'));
    
    // Create reference files
    fs.writeFileSync(`src/content/docs/${locale}/reference/example.md`, createReference(locale));
    fs.writeFileSync(`src/content/docs/${locale}/v1.0/reference/example.md`, createReference(locale, 'v1.0'));
    
    // Create test files
    for (let i = 1; i <= 100; i++) {
      const paddedNum = i.toString().padStart(3, '0');
      fs.writeFileSync(`src/content/docs/${locale}/test/topic-${paddedNum}.md`, createTestPage(i, locale));
      fs.writeFileSync(`src/content/docs/${locale}/v1.0/test/topic-${paddedNum}.md`, createTestPage(i, locale, 'v1.0'));
    }
    
    // Create i18n file
    fs.writeFileSync(`src/content/i18n/${locale}.json`, createI18nFile(locale));
    
    console.log(`✅ ${locale.toUpperCase()} content created (404 files)`);
  });
  
  console.log('\n🎉 All locales created successfully!');
  console.log('📊 Total new files: ~808');
  console.log('\n⚠️  Remember to update astro.config.mjs with the new locales and sidebar translations!');
}

// Run the script
addLocales(); 