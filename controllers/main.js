$(document).ready(function () {
    var callData = new CallData();
    var choosenList = new ChoosenList();

    getAndRenderData();

    function getAndRenderData() {
        callData.getListData()
            .done(function (res) {
                // console.log(res);
                var innerNavPills = '';
                var innerNavPanes = '';

                res.navPills.forEach(function (item, index) {
                    var activeClass = item.tabName === 'tabTopClothes' ? 'active' : '';
                    var fadeClass = item.tabName !== 'tabTopClothes' ? 'fade' : '';

                    innerNavPills += renderNavPills(item, activeClass);
                    innerNavPanes += renderNavPanes(res.tabPanes, fadeClass, activeClass, item);
                })

                $('.nav-pills').html(innerNavPills);
                $('.tab-content').html(innerNavPanes);
            })
            .fail(function (err) {
                console.log(err);
            });
    }

    function renderNavPills(item, activeClass) {
        return `
            <li class="nav-item">
                <a class="nav-link ${activeClass} btn-default" data-toggle="pill" href="#${item.tabName}">${item.showName}</a>
            </li>
        `;
    }

    function getNavPanesArr(tabPanesArr, type) {
        var navPaneItems = [];
        tabPanesArr.forEach(function (item, index) {
            if (item.type === type) {
                navPaneItems.push(item);
            }
        });
        return navPaneItems;
    }

    function renderNavPaneItemsArr(navPaneItemsArr) {
        var innerNavPane = '';
        navPaneItemsArr.forEach(function (item) {
            innerNavPane += `
                <div class="col-md-3">
                    <div class="card text-center">
                        <img src="${item.imgSrc_jpg}"/>
                        <h4><b>${item.name}</b></h4>
                        <button data-id="${item.id}" data-type="${item.type}" data-name="${item.name}" data-desc="${item.desc}" data-imgsrcjpg="${item.imgSrc_jpg}" data-imgsrcpng="${item.imgSrc_png}" class="tryItNow">Thử đồ</button>
                    </div>
                </div>
            `;
        });
        return innerNavPane;
    }

    function renderNavPanes(tabPanesArr, fadeClass, activeClass, item) {
        var navPaneItemsArr = getNavPanesArr(tabPanesArr, item.type);
        var innerNavPane = renderNavPaneItemsArr(navPaneItemsArr);

        var innerFinal = `
            <div class="tab-pane container ${fadeClass} ${activeClass}" id="${item.tabName}">
                <div class="row">
                    ${innerNavPane}
                </div>
            </div>
        `;
        return innerFinal;
    }

    function findChoosenInList(choosenArr, checkItem) {
        var index = -1;
        if (choosenArr && choosenArr.length > 0) {
            choosenArr.forEach(function (item, i) {
                if (item.type === checkItem.type) {
                    index = i;
                }
            });
        }
        return index;
    }

    $('body').delegate('.tryItNow', 'click', function () {
        var id = $(this).data('id');
        var type = $(this).data('type');
        var name = $(this).data('name');
        var desc = $(this).data('desc');
        var jpgSrc = $(this).data('imgsrcjpg');
        var pngSrc = $(this).data('imgsrcpng');

        var choosen = new Choosen(id, type, name, desc, jpgSrc, pngSrc);

        var index = findChoosenInList(choosenList.arr, choosen);
        if (index !== -1) {
            choosenList.arr[index] = choosen;
        } else if (index === -1) {
            choosenList.addChoosenItem(choosen);
        }
        renderContain(choosenList.arr);
    });

    function renderContain(choosenArr) {
        choosenArr.forEach(function (item) {
            if (item.type === "topclothes") {
                renderTopClothes(item.pngSrc);
            }
            if (item.type === "botclothes") {
                renderBotClothes(item.pngSrc);
            }
            if (item.type === "shoes") {
                renderShoes(item.pngSrc);
            }
            if (item.type === "handbags") {
                renderHandBags(item.pngSrc);
            }
            if (item.type === "necklaces") {
                renderNecklaces(item.pngSrc);
            }
            if (item.type === "hairstyle") {
                renderHairstyle(item.pngSrc);
            }
            if (item.type === "background") {
                renderBackground(item.pngSrc);
            }
        });
    }

    function renderTopClothes(pngSrc) {
        $('.bikinitop').css({
            width: "500px",
            height: "500px",
            background: `url("${pngSrc}")`,
            position: "absolute",
            top: "-9%",
            left: "-5%",
            zIndex: "3",
            transform: "scale(0.5)"
        });
    }

    function renderBotClothes(pngSrc) {
        $('.bikinibottom').css({
            width: "500px",
            height: "1000px",
            background: `url("${pngSrc}")`,
            position: "absolute",
            top: "-30%",
            left: "-5%",
            zIndex: "2",
            transform: "scale(0.5)"
        });
    }

    function renderShoes(pngSrc) {
        $('.feet').css({
            width: "500px",
            height: "1000px",
            background: `url("${pngSrc}")`,
            position: "absolute",
            bottom: "-37%",
            right: "-3.5%",
            transform: "scale(0.5)",
            zIndex: "1"
        });
    }

    function renderHandBags(pngSrc) {
        $('.handbag').css({
            width: "500px",
            height: "1000px",
            background: `url("${pngSrc}")`,
            position: "absolute",
            bottom: "-40%",
            right: "-3.5%",
            transform: "scale(0.5)",
            zIndex: "4"
        });
    }

    function renderNecklaces(pngSrc) {
        $('.necklace').css({
            width: "500px",
            height: "1000px",
            background: `url("${pngSrc}")`,
            position: "absolute",
            bottom: "-40%",
            right: "-3.5%",
            transform: "scale(0.5)",
            zIndex: "4"
        });
    }

    function renderHairstyle(pngSrc) {
        $('.hairstyle').css({
            width: "1000px",
            height: "1000px",
            background: `url("${pngSrc}")`,
            position: "absolute",
            top: "-75%",
            right: "-57%",
            transform: "scale(0.15)",
            zIndex: "4"
        });
    }

    function renderBackground(pngSrc) {
        $('.background').css({
            backgroundImage: `url("${pngSrc}")`
        });
    }
});