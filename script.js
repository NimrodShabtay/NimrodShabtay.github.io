// Publications data - static constant, sorted by:
// TIER 1: Accepted papers, first/equal-first author (by year desc)
// TIER 2: Accepted papers, not first/equal-first author (by year desc)
// TIER 3: Preprints / not yet accepted (by year desc)
const PUBLICATIONS = [
    // ===== TIER 1: Accepted — First or Equal-First Author =====
        {
        title: 'Teaching VLMs to Localize Specific Objects from In-context Examples',
        authors: 'Sivan Doveh*, <strong>Nimrod Shabtay*</strong>, Wei Lin, Eli Schwartz, Hilde Kuehne, Raja Giryes, Rogerio Feris, Leonid Karlinsky, James Glass, Assaf Arbelle, Shimon Ullman, M. Jehanzeb Mirza',
        venue: 'ICCV',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2411.13317' },
            { label: 'Code', url: 'https://github.com/SivanDoveh/IPLoc' },
            { label: 'Project Page', url: 'https://sivandoveh.github.io/IPLoc/' },
        ],
    },
    {
        title: 'Spoken Question Answering for Visual Queries',
        authors: '<strong>Nimrod Shabtay</strong>, Zvi Kons, Avihu Dekel, Hagai Aronowitz, Ron Hoory, Assaf Arbelle',
        venue: 'INTERSPEECH',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2505.23308' },
        ],
    },
    {
        title: 'LiveXiv: A Multi-Modal Live Benchmark Based on Arxiv Papers Content',
        authors: '<strong>Nimrod Shabtay</strong>, Felipe Maia Polo, Sivan Doveh, Wei Lin, M. Jehanzeb Mirza, Leshem Choshen, Mikhail Yurochkin, Yuekai Sun, Assaf Arbelle, Leonid Karlinsky, Raja Giryes',
        venue: 'ICLR',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2410.10783' },
            { label: 'Code', url: 'https://github.com/NimrodShabtay/LiveXiv' },
            { label: 'Dataset', url: 'https://huggingface.co/datasets/LiveXiv/LiveXiv' },
        ],
    },
    {
        title: 'PIP: Positional-encoding Image Prior',
        authors: '<strong>Nimrod Shabtay*</strong>, Eli Schwartz*, Raja Giryes',
        venue: 'IEEE Transactions on Image Processing (TIP)',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2211.14298' },
            { label: 'Code', url: 'https://github.com/NimrodShabtay/positional-encoding-image-prior' },
            { label: 'Project Page', url: 'https://nimrodshabtay.github.io/PIP/' },
        ],
    },
    {
        title: 'Deep Phase Coded Image Prior',
        authors: '<strong>Nimrod Shabtay</strong>, Eli Schwartz, Raja Giryes',
        venue: 'ICCP',
        year: '2024',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2404.03906' },
            { label: 'Code', url: 'https://github.com/NimrodShabtay/DPCIP' },
        ],
    },
    // ===== TIER 2: Accepted — Not First/Equal-First Author =====
    {
        title: 'Advancing Speech Understanding in Speech-Aware Language Models with GRPO',
        authors: 'Avishai Elmakies, Hagai Aronowitz, <strong>Nimrod Shabtay</strong>, Eli Schwartz, Ron Hoory, Avihu Dekel',
        venue: 'ICASSP',
        year: '2026',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2509.16990' },
        ],
    },
    // ===== TIER 3: Preprints =====
    {
        title: 'CLIMP: Contrastive Language-Image Mamba Pretraining',
        authors: '<strong>Nimrod Shabtay</strong>, Itamar Zimerman, Eli Schwartz, Raja Giryes',
        venue: 'arXiv',
        year: '2026',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2601.06891' },
        ],
    },
    {
        title: 'CARES: Context-Aware Resolution Selector for VLMs',
        authors: 'Moshe Kimhi*, <strong>Nimrod Shabtay*</strong>, Raja Giryes, Chaim Baskin, Eli Schwartz',
        venue: 'arXiv',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2510.19496' },
        ],
    },
    {
        title: 'Granite Vision: A Lightweight, Open-source Multimodal Model for Enterprise Intelligence',
        authors: 'Granite Vision Team (including Nimrod Shabtay)',
        venue: 'arXiv',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2502.09927' },
            { label: 'Code', url: 'https://github.com/ibm-granite/granite-vision-models' },
            { label: 'Models', url: 'https://huggingface.co/ibm-granite/granite-vision-3.2-2b' },
        ],
    },
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderPublications();
    displayLastUpdated();
    initMobileNav();
});

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
}

function displayLastUpdated() {
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('last-updated').textContent = date;
}

function renderPublications() {
    const publicationsList = document.getElementById('publications-list');

    const html = PUBLICATIONS.map(pub => `
        <article class="publication">
            <h3 class="pub-title">${pub.title}</h3>
            ${pub.authors ? `<div class="pub-authors">${pub.authors}</div>` : ''}
            ${pub.venue ? `<div class="pub-venue">${pub.venue}${pub.year ? ', ' + pub.year : ''}</div>` : ''}
            ${pub.links && pub.links.length > 0 ? `
                <div class="pub-links">
                    ${pub.links.map(link => `<a href="${link.url}" target="_blank" class="pub-link">[${link.label}]</a>`).join('')}
                </div>
            ` : ''}
        </article>
    `).join('');

    publicationsList.innerHTML = html;
}
