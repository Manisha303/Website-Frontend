
    
    async function fetchData(url) {
        const response = await fetch(url);
        return response.json();
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            showCategory(tab.textContent.trim());
        });

        tab.addEventListener('mouseenter', function () {
            if(tab.textContent.trim() === 'Men'){
            tab.classList.add('hover');}
        });

        tab.addEventListener('mouseleave', function () {
            if(tab.textContent.trim() === 'Men'){
            tab.classList.remove('hover');}
        });
    });


    function truncateTitle(title, maxLength) {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
        return title;
    }

    async function showCategory(categoryName) {
        const productsContainer = document.querySelector('.products');
        
        productsContainer.innerHTML = ''; 
        const data = await fetchData('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const category = data.categories.find(cat => cat.category_name === categoryName);

        if (category) {
            for (const product of category.category_products) {
                const productCard = document.createElement('div');
                productCard.classList.add('product');

                productCard.innerHTML = `
                    <img src="${product.image}" alt="" class="product-img">
                    ${product.badge_text ?`<div class="badge">${ product.badge_text}</div>`:``}
                    <div class="product-details">
                    <h2 class="product-title">${truncateTitle(product.title,10)}</h2>
                    <ul><li><p class="product-vendor">${product.vendor}</p></li></ul>
                    </div>
                    <div class="product-details">
                    <p class="price">Rs ${product.price}.00</p>
                    <p class="compare-price"><s> ${product.compare_at_price}.00</s></p>
                    <p class="discount">${calculateDiscount(product.price, product.compare_at_price)}% Off</p>
                    </div>
                    <button> Add to Cart </button>
                    `;

                productsContainer.appendChild(productCard);
            }
        }
    }

    function calculateDiscount(price, compareAtPrice) {
        if (!compareAtPrice) return 0;

        const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
        return discount.toFixed(2);
    }

    // Show default category on page load
    showCategory('Men');