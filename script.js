function toggleSection(group) {
    const element = document.getElementById(group);
    if (element.style.display === 'flex') {
        element.style.display = 'none';
    } else {
        document.querySelectorAll('.sub-faction').forEach(f => f.style.display = 'none');
        element.style.display = 'flex';  
        window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
    }
}
function showSubFactions(group) {
    toggleSection(group);
}
function showSubRules(group) {
    toggleSection(group);
}





document.getElementById('search-bar').addEventListener('input', function() {
    let searchText = this.value.toLowerCase().trim();
    
    // Сбрасываем все подсветки
    document.querySelectorAll('.mega-card, .sub-card').forEach(card => {
        card.style.backgroundColor = '';
    });
    
    // Если строка поиска пустая - скрываем все подразделы и выходим
    if (searchText === '') {
        document.querySelectorAll('.sub-faction').forEach(f => f.style.display = 'none');
        return;
    }
    
    let foundResults = false;
    const searchWords = searchText.split(/\s+/); // Разбиваем на отдельные слова
    
    // Ищем сначала в мега-карточках (основных разделах)
    document.querySelectorAll('.mega-card').forEach(card => {
        const cardText = card.textContent.toLowerCase();
        const matchesAllWords = searchWords.every(word => cardText.includes(word));
        
        if (matchesAllWords) {
            foundResults = true;
            card.style.backgroundColor = 'rgba(0, 170, 255, 0.2)';
            const targetId = card.getAttribute('onclick').match(/'([^']+)'/)[1];
            document.getElementById(targetId).style.display = 'flex';
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
    
    // Если не нашли в основных разделах, ищем в подкарточках
    if (!foundResults) {
        document.querySelectorAll('.sub-card').forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const matchesAllWords = searchWords.every(word => cardText.includes(word));
            
            if (matchesAllWords) {
                foundResults = true;
                card.style.backgroundColor = 'rgba(0, 170, 255, 0.2)';
                // Находим родительский раздел и показываем его
                const parentSection = card.closest('.sub-faction');
                if (parentSection) {
                    parentSection.style.display = 'flex';
                    parentSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    }
    
    // Скрываем все подразделы, где нет совпадений
    document.querySelectorAll('.sub-faction').forEach(section => {
        const hasMatches = section.querySelector('.sub-card[style*="background-color"]');
        if (!hasMatches) {
            section.style.display = 'none';
        }
    });
    
    // Показываем сообщение, если ничего не найдено
    const noResultsMsg = document.getElementById('no-results-msg') || createNoResultsMsg();
    noResultsMsg.style.display = foundResults ? 'none' : 'block';
});

function createNoResultsMsg() {
    const msg = document.createElement('div');
    msg.id = 'no-results-msg';
    msg.textContent = 'No results found';
    msg.style.display = 'none';
    msg.style.color = '#ff5555';
    msg.style.margin = '20px';
    msg.style.fontSize = '1.5em';
    document.body.appendChild(msg);
    return msg;
}