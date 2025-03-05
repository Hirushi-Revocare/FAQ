document.addEventListener("DOMContentLoaded", function () {
    fetch('/index.json')
        .then(response => response.json())
        .then(data => {
            let lunrIndex = lunr(function () {
                this.ref('url');
                this.field('title');
                this.field('content');

                data.forEach(doc => this.add(doc));
            });

            let searchInput = document.getElementById('search');
            let resultsDiv = document.getElementById('results');

            searchInput.addEventListener('input', function () {
                let query = this.value.trim();
                resultsDiv.innerHTML = "";

                if (query.length > 0) {
                    let results = lunrIndex.search(query);

                    results.forEach(result => {
                        let item = data.find(d => d.url === result.ref);
                        let div = document.createElement("div");
                        div.innerHTML = `<a href="${item.url}"><strong>${item.title}</strong></a><p>${item.content}</p>`;
                        resultsDiv.appendChild(div);
                    });
                }
            });
        });
});
