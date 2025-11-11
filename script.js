// Configuration - REPLACE WITH YOUR GOOGLE SCHOLAR ID
const SCHOLAR_ID = 'z4Jk_I4AAAAJ'; // Find this in your Google Scholar profile URL

// Proxy URL to avoid CORS issues
const PROXY_URL = 'https://api.allorigins.win/raw?url=';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadPublications();
    displayLastUpdated();
});

function displayLastUpdated() {
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('last-updated').textContent = date;
}

async function loadPublications() {
    const publicationsList = document.getElementById('publications-list');
    
    try {
        // Fetch Google Scholar profile page
        const scholarUrl = `https://scholar.google.com/citations?user=${SCHOLAR_ID}&hl=en`;
        const response = await fetch(PROXY_URL + encodeURIComponent(scholarUrl));
        
        if (!response.ok) {
            throw new Error('Failed to fetch publications');
        }
        
        const html = await response.text();
        const publications = parseScholarHTML(html);
        
        if (publications.length === 0) {
            publicationsList.innerHTML = `
                <div class="error-message">
                    <p>Unable to load publications automatically. Please check your Scholar ID.</p>
                    <p>You can manually add publications by editing the HTML file.</p>
                </div>
            `;
            return;
        }
        
        displayPublications(publications);
        
    } catch (error) {
        console.error('Error loading publications:', error);
        
        // Fallback to manual publications
        displayManualPublications();
    }
}

function parseScholarHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const publications = [];
    
    // Parse publication entries from Google Scholar
    const pubElements = doc.querySelectorAll('.gsc_a_tr');
    
    pubElements.forEach(pub => {
        try {
            const titleElement = pub.querySelector('.gsc_a_at');
            const authorsElement = pub.querySelector('.gs_gray:first-of-type');
            const venueElement = pub.querySelector('.gs_gray:last-of-type');
            const yearElement = pub.querySelector('.gsc_a_y');
            const citationsElement = pub.querySelector('.gsc_a_c');
            
            if (titleElement) {
                publications.push({
                    title: titleElement.textContent.trim(),
                    authors: authorsElement ? authorsElement.textContent.trim() : '',
                    venue: venueElement ? venueElement.textContent.trim() : '',
                    year: yearElement ? yearElement.textContent.trim() : '',
                    citations: citationsElement ? citationsElement.textContent.trim() : '0',
                    url: titleElement.href ? titleElement.href : '#'
                });
            }
        } catch (e) {
            console.error('Error parsing publication:', e);
        }
    });
    
    return publications;
}

function displayPublications(publications) {
    const publicationsList = document.getElementById('publications-list');
    
    displayManualPublications();
    
    const html = manualPubs.map(pub => {
        // Bold your name in the authors list
        const authorsWithBold = pub.authors ? pub.authors.replace('Nimrod Shabtay', '<strong>Nimrod Shabtay</strong>') : '';
        
        return `
            <article class="publication">
                <h3 class="pub-title">${pub.title}</h3>
                ${authorsWithBold ? `<div class="pub-authors">${authorsWithBold}</div>` : ''}
                ${pub.venue ? `<div class="pub-venue">${pub.venue}${pub.year ? ', ' + pub.year : ''}</div>` : ''}
                ${pub.links && pub.links.length > 0 ? `
                    <div class="pub-links">
                        ${pub.links.map(link => `<a href="${link.url}" target="_blank" class="pub-link">[${link.label}]</a>`).join('')}
                    </div>
                ` : ''}
                ${pub.citations ? `<div class="pub-meta">${pub.citations} citations</div>` : ''}
            </article>
        `;
    }).join('');
    
    publicationsList.innerHTML = html;
}

function displayManualPublications() {
    // Fallback: Display manually entered publications
    const publicationsList = document.getElementById('publications-list');
    
const manualPubs = [
    {
        title: 'CARES: Context-Aware Resolution Selector for VLMs',
        authors: 'Moshe Kimhi*, <strong>Nimrod Shabtay*</strong>, Raja Giryes, Chaim Baskin, Eli Schwartz',
        venue: 'arXiv',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2510.19496' }
        ],
    },
    {
        title: 'Advancing Speech Understanding in Speech-Aware Language Models with GRPO',
        authors: 'Avishai Elmakies, Hagai Aronowitz, <strong>Nimrod Shabtay</strong>, Eli Schwartz, Ron Hoory, Avihu Dekel',
        venue: 'arXiv',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2509.16990' }
        ],
    },
    {
        title: 'Teaching VLMs to Localize Specific Objects from In-context Examples',
        authors: 'Sivan Doveh*, <strong>Nimrod Shabtay*</strong>, Wei Lin, Eli Schwartz, Hilde Kuehne, Raja Giryes, Rogerio Feris, Leonid Karlinsky, James Glass, Assaf Arbelle, Shimon Ullman, M. Jehanzeb Mirza',
        venue: 'ICCV',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2411.13317' },
            { label: 'Code', url: 'https://github.com/sivandoveh/iploc' },

        ],
    },
    {
        title: 'Spoken question answering for visual queries',
        authors: '<strong>Nimrod Shabtay*</strong>, Zvi Kons*, Eli Schwartz, Hagai Aronowitz, Ron Hoory, Raja Giryes',
        venue: 'INTERSPEECH',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2505.23308' }
        ],
    },
    
    {
        title: 'Granite Vision: a lightweight, open-source multimodal model for enterprise Intelligence',
        authors: 'Granite Vision Team (including Nimrod Shabtay)',
        venue: 'arXiv',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2502.09927' }
        ],
    },
    
    {
        title: 'LiveXiv: A Multi-Modal Live Benchmark Based on Arxiv Papers Content',
        authors: '<strong>Nimrod Shabtay</strong>, Felipe Maia Polo, Sivan Doveh, Wei Lin, M. Jehanzeb Mirza, Leshem Choshen, Mikhail Yurochkin, Yuekai Sun, Assaf Arbelle, Leonid Karlinsky, Raja Giryes',
        venue: 'ICLR',
        year: '2025',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2410.10783' },
            { label: 'Dataset', url: 'https://huggingface.co/datasets/LiveXiv/LiveXiv' },
            { label: 'Code', url: 'https://arxiv.org/abs/2410.10783' },
        ],
    },
    
    {
        title: 'Deep Phase Coded Image Prior',
        authors: '<strong>Nimrod Shabtay</strong>, Eli Schwartz, Raja Giryes',
        venue: 'ICCP',
        year: '2024',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2404.03906' },
            { label: 'Code', url: 'https://github.com/NimrodShabtay/DPCIP' }
                
        ],
    },
    
    {
        title: 'PIP: Positional-encoding Image Prior',
        authors: '<strong>Nimrod Shabtay*</strong>, Eli Schwartz*, Raja Giryes',
        venue: 'arXiv',
        year: '2022',
        links: [
            { label: 'Paper', url: 'https://arxiv.org/abs/2211.14298' },
            { label: 'code', url: 'https://github.com/NimrodShabtay/positional-encoding-image-prior' }
               
        ],
    },
];
    
    if (manualPubs.length === 0 || !manualPubs[0].title) {
        publicationsList.innerHTML = `
            <div class="error-message">
                <p><strong>Setup Required:</strong> Please configure your publications.</p>
                <ol style="text-align: left; margin-top: 1rem;">
                    <li>Add your Google Scholar ID in <code>script.js</code></li>
                    <li>Or manually add publications in the <code>displayManualPublications()</code> function</li>
                </ol>
            </div>
        `;
        return;
    }
    
    const html = manualPubs.map(pub => `
        <article class="publication">
            <h3 class="pub-title">${pub.title}</h3>
            ${pub.authors ? `<div class="pub-authors">${pub.authors}</div>` : ''}
            ${pub.venue ? `<div class="pub-venue">${pub.venue}${pub.year ? ', ' + pub.year : ''}</div>` : ''}
            ${pub.links && pub.links.length > 0 ? `
                <div class="pub-links">
                    ${pub.links.map(link => `<a href="${link.url}" target="_blank" class="pub-link">[${link.label}]</a>`).join('')}
                </div>
            ` : ''}
            ${pub.citations ? `<div class="pub-meta">${pub.citations} citations</div>` : ''}
        </article>
    `).join('');
    
    publicationsList.innerHTML = html;
}
