import fs from 'fs';
import path from 'path';

// Translation data
const translations = {
  uk: {
    welcome: 'Ласкаво просимо до Starlight',
    description: 'Почніть створювати свій сайт документації з Starlight.',
    tagline: 'Вітаємо з налаштуванням нового проекту Starlight!',
    exampleGuide: 'Приклад посібника',
    readDocs: 'Читати документацію Starlight',
    nextSteps: 'Наступні кроки',
    updateContent: 'Оновити контент',
    updateContentDesc: 'Відредагуйте `src/content/docs/uk/index.mdx`, щоб побачити зміни на цій сторінці.',
    addContent: 'Додати новий контент',
    addContentDesc: 'Додайте файли Markdown або MDX до `src/content/docs/uk` для створення нових сторінок.',
    configureSite: 'Налаштувати ваш сайт',
    configureSiteDesc: 'Відредагуйте вашу `sidebar` та інші конфігурації в `astro.config.mjs`.',
    readDocsCard: 'Читати документацію',
    readDocsCardDesc: 'Дізнайтеся більше в [Документації Starlight](https://starlight.astro.build/).',
    guideTitle: 'Приклад посібника',
    guideDesc: 'Посібник на моєму новому сайті документації Starlight.',
    guideContent: 'Посібники ведуть користувача через конкретне завдання, яке він хоче виконати, часто з послідовністю кроків.\nНаписання хорошого посібника вимагає роздумів про те, що ваші користувачі намагаються зробити.',
    refTitle: 'Приклад довідки',
    refDesc: 'Довідкова сторінка на моєму новому сайті документації Starlight.',
    refContent: 'Довідкові сторінки ідеально підходять для опису того, як речі працюють стисло та ясно.\nМенш зайняті розповіддю історії або розглядом конкретного випадку використання, вони повинні надавати повні деталі про те, що ви документуєте.',
    furtherReading: 'Додаткове читання',
    topicPrefix: 'Тема'
  },
  ja: {
    welcome: 'Starlightへようこそ',
    description: 'Starlightでドキュメントサイトの構築を始めましょう。',
    tagline: '新しいStarlightプロジェクトの設定おめでとうございます！',
    exampleGuide: 'ガイドの例',
    readDocs: 'Starlightドキュメントを読む',
    nextSteps: '次のステップ',
    updateContent: 'コンテンツを更新',
    updateContentDesc: 'このページの変更を確認するには、`src/content/docs/ja/index.mdx`を編集してください。',
    addContent: '新しいコンテンツを追加',
    addContentDesc: '新しいページを作成するには、`src/content/docs/ja`にMarkdownまたはMDXファイルを追加してください。',
    configureSite: 'サイトを設定',
    configureSiteDesc: '`astro.config.mjs`で`sidebar`やその他の設定を編集してください。',
    readDocsCard: 'ドキュメントを読む',
    readDocsCardDesc: '[Starlightドキュメント](https://starlight.astro.build/)で詳細を学んでください。',
    guideTitle: 'ガイドの例',
    guideDesc: '私の新しいStarlightドキュメントサイトのガイド。',
    guideContent: 'ガイドは、ユーザーが達成したい特定のタスクを通じて、しばしば一連のステップでユーザーを導きます。\n良いガイドを書くには、ユーザーが何をしようとしているかを考える必要があります。',
    refTitle: 'リファレンスの例',
    refDesc: '私の新しいStarlightドキュメントサイトのリファレンスページ。',
    refContent: 'リファレンスページは、物事がどのように機能するかを簡潔かつ明確に説明するのに理想的です。\n物語を語ったり、特定のユースケースに対処することにはあまり関心がなく、文書化している内容について包括的な詳細を提供する必要があります。',
    furtherReading: '参考文献',
    topicPrefix: 'トピック'
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
  const description = `Description for ${t.topicPrefix.toLowerCase()} ${paddedNum} in test documentation`;
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
  const translations = {
    uk: {
      skipLink: "Перейти до контенту",
      search: "Пошук",
      cancel: "Скасувати",
      searchWarning: "Пошук доступний лише в продакшн-збірках. \nСпробуйте зібрати та переглянути сайт для локального тестування.",
      themeSelect: "Вибрати тему",
      dark: "Темна",
      light: "Світла",
      auto: "Автоматична",
      languageSelect: "Вибрати мову",
      menu: "Меню",
      sidebar: "Головна",
      onThisPage: "На цій сторінці",
      overview: "Огляд",
      untranslated: "Цей контент ще не доступний вашою мовою.",
      editLink: "Редагувати сторінку",
      lastUpdated: "Останнє оновлення:",
      previous: "Попередня",
      next: "Наступна",
      draft: "Цей контент є чернеткою і не буде включений в продакшн-збірки.",
      notFound: "Сторінку не знайдено. Перевірте URL або спробуйте використати панель пошуку.",
      note: "Примітка",
      tip: "Порада",
      caution: "Обережно",
      danger: "Небезпека",
      directory: "Директорія",
      builtWith: "Створено з Starlight"
    },
    ja: {
      skipLink: "コンテンツにスキップ",
      search: "検索",
      cancel: "キャンセル",
      searchWarning: "検索は本番ビルドでのみ利用可能です。\nローカルでテストするには、ビルドしてサイトをプレビューしてください。",
      themeSelect: "テーマを選択",
      dark: "ダーク",
      light: "ライト",
      auto: "自動",
      languageSelect: "言語を選択",
      menu: "メニュー",
      sidebar: "メイン",
      onThisPage: "このページで",
      overview: "概要",
      untranslated: "このコンテンツはまだあなたの言語で利用できません。",
      editLink: "ページを編集",
      lastUpdated: "最終更新:",
      previous: "前へ",
      next: "次へ",
      draft: "このコンテンツはドラフトで、本番ビルドには含まれません。",
      notFound: "ページが見つかりません。URLを確認するか、検索バーを使用してください。",
      note: "注記",
      tip: "ヒント",
      caution: "注意",
      danger: "危険",
      directory: "ディレクトリ",
      builtWith: "Starlightで構築"
    }
  };
  
  const t = translations[locale];
  
  return JSON.stringify({
    "skipLink.label": t.skipLink,
    "search.label": t.search,
    "search.ctrlKey": "Ctrl",
    "search.cancelLabel": t.cancel,
    "search.devWarning": t.searchWarning,
    "themeSelect.accessibleLabel": t.themeSelect,
    "themeSelect.dark": t.dark,
    "themeSelect.light": t.light,
    "themeSelect.auto": t.auto,
    "languageSelect.accessibleLabel": t.languageSelect,
    "menuButton.accessibleLabel": t.menu,
    "sidebarNav.accessibleLabel": t.sidebar,
    "tableOfContents.onThisPage": t.onThisPage,
    "tableOfContents.overview": t.overview,
    "i18n.untranslatedContent": t.untranslated,
    "page.editLink": t.editLink,
    "page.lastUpdated": t.lastUpdated,
    "page.previousLink": t.previous,
    "page.nextLink": t.next,
    "page.draft": t.draft,
    "404.text": t.notFound,
    "aside.note": t.note,
    "aside.tip": t.tip,
    "aside.caution": t.caution,
    "aside.danger": t.danger,
    "fileTree.directory": t.directory,
    "builtWithStarlight.label": t.builtWith
  }, null, 2);
}

// Main function
function addLocales() {
  const locales = ['uk', 'ja'];
  
  console.log('🚀 Adding Ukrainian and Japanese locales...\n');
  
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
    
    console.log(`✅ ${locale.toUpperCase()} content created (206 files)`);
  });
  
  console.log('\n🎉 All locales created successfully!');
  console.log('📊 Total new files: ~412');
  console.log('\n⚠️  Remember to update astro.config.mjs with the new locales and sidebar translations!');
}

// Run the script
addLocales();