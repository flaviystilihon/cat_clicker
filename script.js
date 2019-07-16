let model = {
    cats: [],
    current_cat: {},
    init() {
        this.cats = [
            {
                id: '0',
                name: 'cat1',
                src: 'images/cat0.jpg',
                clicks: 0
            },
            {
                id: '1',
                name: 'cat2',
                src: 'images/cat1.jpg',
                clicks: 0
            }
        ]
    },
    getCat(cat_id) {
        for (let i = 0; i < this.cats.length; i++) {
            if (this.cats[i].id == cat_id) {
                return this.cats[i];
            }
        }    
    },
    updateCat(cat_id, new_cat) {

        for (let i = 0; i < this.cats.length; i++) {
            if (this.cats[i].id == cat_id) {
                this.cats[i] = new_cat;
            }
        }
    },
    getCats() {
        return this.cats;
    },
    setCurrentCat: function(cat_id) {
        this.current_cat = this.getCat(cat_id);
    },
    getCurrentCat: function() {
        return this.current_cat;
    }
}

let view_cats_list = {
    render: function (cats_list) {
        for (let i = 0; i < cats_list.length; i++) {
            let cat_item = $("<li class='cat_list_item'></li>");
            cat_item.text(cats_list[i].name);

            cat_item.click((function(cat_id) {
                return function() {
                    octopus.selectCat(cat_id);
                }
            })(cats_list[i].id));

            $('.cats_list').append(cat_item);
        }
    }
}

let cat_container_view = {
    render: function(cat) {
        $(".current_cat_container > .cat_title").text(cat.name);
        $(".current_cat_container > .counter_container").text(cat.clicks);
        $(".current_cat_container > .cat_image").attr("src", cat.src);

        $(".current_cat_container > .cat_image").unbind('click').click((function(cat_id) {
            return function() {
                octopus.catClicked(cat_id);
            }
        })(cat.id));
    },
}

let octopus = {
    init: async function () {
        await model.init();
        await view_cats_list.render(model.getCats());

        const first_cat_id = model.getCats()[0].id;
        this.selectCat(first_cat_id);
    },
    selectCat: (cat_id) => {
        model.setCurrentCat(cat_id);
        const cat = model.getCurrentCat();
        cat_container_view.render(cat);
    },
    catClicked: async function(cat_id) {
        const cat = model.getCurrentCat();
        cat.clicks = cat.clicks + 1;
        model.updateCat(cat_id, cat);
        cat_container_view.render(model.getCurrentCat());
    }
}

octopus.init();