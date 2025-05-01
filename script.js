function showSubFactions(group) {
    document.querySelectorAll('.sub-faction').forEach(f => f.style.display = 'none');
    document.getElementById(group).style.display = 'flex';
    window.scrollTo({ top: document.getElementById(group).offsetTop, behavior: 'smooth' });
}