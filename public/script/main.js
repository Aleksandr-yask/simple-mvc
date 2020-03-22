$('.addNew').click(function () {
    $('#post-type').val('new');
    $('#m-title').html('Добавить');
    $('.adder').html('');
    $('#POOName').val('');
    $('#data-pooName').val('');
    $('#addNewModal').modal('toggle')
});


$(document).ready(function() {
    $('form').keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
});

function filterFunction(that, event, is=true) {
    let container, input, filter, li, input_val;
    if (!is)
        container = $(that).closest(".searchable2");
    else container = $(that).closest(".searchable");
    input_val = container.find("input").val().toUpperCase();

    if (["ArrowDown", "ArrowUp", "Enter"].indexOf(event.key) != -1) {
        keyControl(event, container)
    } else {
        li = container.find("ul li");
        li.each(function (i, obj) {
            if ($(this).text().toUpperCase().indexOf(input_val) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        container.find("ul li").removeClass("selected");
        setTimeout(function () {
            container.find("ul li:visible").first().addClass("selected");
        }, 100)
    }
}

function keyControl(e, container) {
    if (e.key == "ArrowDown") {

        if (container.find("ul li").hasClass("selected")) {
            if (container.find("ul li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length) {
                container.find("ul li.selected").removeClass("selected").nextAll().not('[style*="display: none"]').first().addClass("selected");
            }

        } else {
            container.find("ul li:first-child").addClass("selected");
        }

    } else if (e.key == "ArrowUp") {

        if (container.find("ul li:visible").index(container.find("ul li.selected")) > 0) {
            container.find("ul li.selected").removeClass("selected").prevAll().not('[style*="display: none"]').first().addClass("selected");
        }
    } else if (e.key == "Enter") {
        if (container.find("ul li.selected").data('id') != 'none') {
            container.find("input").val(container.find("ul li.selected").text()).blur();
            if (container.id !== 's-POOName') onSelect(container.find("ul li.selected").data('id'))
            else searchByPOOName();
        }

    }

    container.find("ul li.selected")[0].scrollIntoView({
        behavior: "smooth",
    });
}

function onSelect(val) {
    if (val === 'none') return;
    if ($('#post-type').val() !== 'edit') {
        if (val == '0') {
            chengeModal(0);
        } else {
            $('#data-pooName').val(val);
            chengeModal(1);
        }
    } else {
        $('#data-pooName').val(val);
    }
}

$(".searchable input").focus(function () {
    $(this).closest(".searchable").find("ul").show();
    $(this).closest(".searchable").find("ul li").show();
});
$(".searchable input").blur(function () {
    let that = this;
    setTimeout(function () {
        $(that).closest(".searchable").find("ul").hide();
    }, 300);
});

$(".searchable2 input").focus(function () {
    $(this).closest(".searchable2").find("ul").show();
    $(this).closest(".searchable2").find("ul li").show();
});
$(".searchable2 input").blur(function () {
    let that = this;
    setTimeout(function () {
        $(that).closest(".searchable2").find("ul").hide();
    }, 300);
});

$(document).on('click', '.searchable ul li', function () {
    if ($(this).data('id') === 'none') return;
    $(this).closest(".searchable").find("input").val($(this).text()).blur();

    onSelect($(this).data('id'))
});
$(document).on('click', '.searchable2 ul li', function () {
    if ($(this).data('id') === 'none') return;
    $(this).closest(".searchable2").find("input").val($(this).text()).blur();
    searchByPOOName();

});

$(".searchable ul li").hover(function () {
    $(this).closest(".searchable").find("ul li.selected").removeClass("selected");
    $(this).addClass("selected");
});
$(".searchable2 ul li").hover(function () {
    $(this).closest(".searchable2").find("ul li.selected").removeClass("selected");
    $(this).addClass("selected");
});

function chengeModal($ty) {
    if ($ty === 0) {
        $('#post-type').val('newPOO');
        $('.adder').html(`<div class="add-poo">
                        <label for="add-name">Название ПОО</label>
                        <input type="text" name="add-name" class="form-control" id="add-name" placeholder="Название">
                    </div>`);
    } else {
        console.log($('#post-type').val());
        if ($('#post-type').val() !== 'edit') {
            $('#post-type').val('new');
            $('.adder').html(`<div class="add-oth" style="">
                        <label for="prof">Профессия</label>
                        <input required="" type="text" name="prof" class="form-control" id="prof" placeholder="Профессия">
                        <label for="free-place">Колличество свободных мест</label>
                        <input required="" type="number" name="free-place" class="form-control" id="free-place" placeholder="Колличество свободных мест">

                        <label for="free-place">Количество поступивших по приказу</label>
                        <input required="" type="number" name="prikaz" class="form-control" id="f-prikaz" placeholder="Количество поступивших по приказу">
                        <label for="free-place">Количество поступивших по факту</label>
                        <input required="" type="number" name="fact" class="form-control" id="f-fact" placeholder="Количество поступивших по факту">
                        
                        <p>Наличие общежития</p>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="obshez" id="obshez" value="1" checked="">
                            <label class="form-check-label" for="obshez">
                                Да
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="obshez" id="obshez-no" value="0">
                            <label class="form-check-label" for="obshez-no">
                                Нет
                            </label>
                        </div>

                    </div>`);
        }

    }
}

$('#search').keyup(function (e) {
    const elems = document.getElementsByName('td');
});

function searchByPOOName() {
    const elem = document.getElementById('s-POOName');

    let list = document.getElementsByClassName('s-poo-name');
    $('.line').hide();
    for (let i=0;i<list.length; i++) {
        if (list[i].innerHTML.toLowerCase().indexOf(elem.value.toLowerCase()) != -1) {
            $('tr[data-id="'+list[i].parentNode.dataset.id+'"]').show();
        }
    }

}
$('.search-by-table select').change(function () {
    let list = document.getElementsByClassName('s-os-obs');

    $('.line').hide();
    for (let i=0;i<list.length; i++) {
        if (list[i].innerHTML.toLowerCase().indexOf(this.value.toLowerCase()) != -1) {
            $('tr[data-id="'+list[i].parentNode.dataset.id+'"]').show();
        }
    }

});
$('.search-by-table input').keyup(function () {
    if (this.value === '') {$('.line').show(); return}
    let list;
    switch (this.id[this.id.length - 1]) {
        case '1':
            list = document.getElementsByClassName('s-poo-name');
            break;
        case '2':
            list = document.getElementsByClassName('s-prof-name');
            break;
        case '3':
            list = document.getElementsByClassName('s-free-places');
            break;
        case '4':
            list = document.getElementsByClassName('s-os-obs');
            break;
        case '5':
            list = document.getElementsByClassName('s-pricaz');
            break;
        case '6':
            list = document.getElementsByClassName('s-fakt');
            break;
    }

    if (list) {
        $('.line').hide();
        for (let i=0;i<list.length; i++) {
            if (list[i].innerHTML.toLowerCase().indexOf(this.value.toLowerCase()) != -1) {
                $('tr[data-id="'+list[i].parentNode.dataset.id+'"]').show();
            }
        }
    }
});

$('#removeAll').click(function () {
    $('.line').show();
    $('.search-by-table input').val('');
});

$('.search-btn').click(function () {
    $('.search-by-table').animate({
        opacity: "toggle",
        height: "toggle"
    }, 500, function() {
        // Animation complete.
    });
});

$('.reinput').click(function () {
    $('#m-title').html('Изменить');
    $('#post-type').val('edit');
    const per = this.parentNode.parentNode;

    $('#POOName').val(per.parentNode.getElementsByClassName('s-poo-name')[0].innerHTML);
    $('#data-pooName').val(per.dataset.id);

    const oCh = (per.getElementsByClassName('s-os-obs')[0].innerHTML == 'Да') ? 'checked' : '';
    const tCh = (per.getElementsByClassName('s-os-obs')[0].innerHTML == 'Нет') ? 'checked' : '';
    $('.adder').html(`<div class="add-oth" style="">
                        <input type="hidden" name="id" value="${per.getElementsByClassName('s-prof-name')[0].dataset.ids}">
                        <label for="prof">Профессия</label>
                        <input required="" value='${per.getElementsByClassName('s-prof-name')[0].innerHTML}' type="text" name="prof" class="form-control" id="prof" placeholder="Профессия">
                        <label for="free-place">Колличество свободных мест</label>
                        <input required="" value="${per.getElementsByClassName('s-free-places')[0].innerHTML}" type="number" name="free-place" class="form-control" id="free-place" placeholder="Колличество свободных мест">

                        <label for="free-place">Количество поступивших по приказу</label>
                        <input required="" value="${per.getElementsByClassName('s-pricaz')[0].innerHTML}" type="number" name="prikaz" class="form-control" id="f-prikaz" placeholder="Количество поступивших по приказу">
                        <label for="free-place">Количество поступивших по факту</label>
                        <input required="" value="${per.getElementsByClassName('s-fakt')[0].innerHTML}" type="number" name="fact" class="form-control" id="f-fact" placeholder="Количество поступивших по факту">
                        
                        
                        <div class="form-check">
                            <input ${oCh} class="form-check-input" type="radio" name="obshez" id="obshez" value="1" checked="">
                            <label class="form-check-label" for="obshez">
                                Да
                            </label>
                        </div>
                        <div class="form-check">
                            <input ${tCh} class="form-check-input" type="radio" name="obshez" id="obshez-no" value="0">
                            <label class="form-check-label" for="obshez-no">
                                Нет
                            </label>
                        </div>

                    </div>`);

    $('#addNewModal').modal('toggle');
});
$('.delete-b').click(function () {
    if (confirm('Вы уверены, что хотите удалить?')) {
        $.ajax({
            url: '/table1',
            method: 'post',
            data: {
                type: 'delete',
                id: this.dataset.ids
            },
            success: function(){
                location.reload();
            }
        });
    }
});

function CallPrint(strid) {
    var prtContent = document.getElementById(strid);
    var WinPrint = window.open('','','left=50,top=50,width=800,height=640,toolbar=0,scrollbars=1,status=0');
    WinPrint.document.write('');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.write('');
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
    prtContent.innerHTML=strOldOne;
}
















