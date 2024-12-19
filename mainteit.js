/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
let arrowUp = document.getElementById("arup");
let arrowDn = document.getElementById("ardn");
let wSyd = document.getElementById("webSyd");
let wMain = document.querySelector("body>.section");
let wBtm = document.getElementById("webBtm");
let sidebar = document.getElementById("myNav");
var i, a;
let clerics = document.getElementById("clericals");
let forms = document.getElementById("forms");
let notice = document.getElementById("noticeMenu");
let dropMenu = document.getElementById("dropMenu");
let postals = document.getElementById("postals_dropMenu");
let counter = 0;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
	if (e.target == wMain) {
		console.log("clicked body");
		notice.style.visibility = "hidden";
		dropMenu.style.visibility = "hidden";
		postals.style.visibility = "hidden";
	}
};

let miniTabs = document.getElementsByClassName("miniTabsLinks");
for (let b = 0; b < miniTabs.length; b++) {
	let clickedBtn = miniTabs[b];
	clickedBtn.classList.remove("m_active");
	clickedBtn.addEventListener("click", function () {
		let current = document.getElementsByClassName("m_active");

		// If there's no active class
		if (current.length > 0) {
			current[0].className = current[0].className.replace(" m_active", "");
		}

		// Add the active class to the current/clicked button
		this.className += " m_active";
	});
}
//code to switch tabs in front office -> clericals
function switch_tab(t) {
	let selectedTab = document.getElementById(t);
	//for each of the chile node of the cleric element set display to none to hide them
	for (let a = 0; a < clerics.children.length; a++) {
		//if clicked button doesnot corresponds to the child node
		//being displayed, hide the child node, else skip it
		if (
			clerics.children[a].getAttribute("id") != selectedTab.getAttribute("id")
		) {
			clerics.children[a].style = "display:none";
		}
	}
	//hide dropdwn of postals after a menu is selected
	if (t === "postals_tab") {
		dropPostals();
	}
	//or if any other tab button is selected
	else if (t !== "postals_tab") {
		postals.style.visibility = "hidden";
	}
	//set selected node to display attribute to block
	selectedTab.setAttribute("style", "display:block");
}
//code to switch tabs in admin -> new account
function switch_form(t) {
	let selectedTab = document.getElementById(t);
	//for each of the child node of the cleric element set display to none to hide them
	for (let a = 0; a < forms.children.length; a++) {
		//if clicked button doesnot corresponds to the child node
		//being displayed, hide the child node, else skip it
		if (
			forms.children[a].getAttribute("id") != selectedTab.getAttribute("id")
		) {
			forms.children[a].style = "display:none";
		}
	}
	//set selected node to display attribute to block
	selectedTab.setAttribute("style", "display:block");
}

//code for sidebar dropdown menu
for (i = 0; i < dropdown.length; i++) {
	let clickedNode = dropdown[i];
	clickedNode.addEventListener("click", function () {
		this.classList.toggle("active");
		var dropdownContent = this.nextElementSibling;
		if (dropdownContent.style.display === "block") {
			dropdownContent.style.display = "none";
			clickedNode.children[0].classList.remove("side-icon");
			clickedNode.children[1].classList.remove("navName_active");
			clickedNode.children[2].children[0].style.display = "block";
			clickedNode.children[2].children[1].style.display = "none";
		} else {
			dropdownContent.style.display = "block";
			clickedNode.children[0].classList.add("side-icon");
			clickedNode.children[1].classList.add("navName_active");
			clickedNode.children[2].children[0].style.display = "none";
			clickedNode.children[2].children[1].style.display = "block";
		}
	});
}

/**
 * function to toggle dropdown menu
 * @param {String|Node} selector
 * @param {Event|undefined} e
 */
function dropDown(dropDownSelector, e) {
	if (!e) {
		e = event;
	}
	e.stopPropagation();
	// clear window event listeners
	window.removeEventListener("click", dropDown, { once: true });
	// get element to be made visible
	const element =
		"string" === typeof dropDownSelector
			? document.querySelector(dropDownSelector)
			: dropDownSelector;
	// validate if there is any visible drop down and its not clicked drop down
	if (
		document.querySelector("[data-dropdown-active=true]") &&
		document.querySelector("[data-dropdown-active=true]") !== element
	) {
		const activeDropDown = document.querySelector(
			"[data-dropdown-active=true]"
		);
		delete activeDropDown.dataset["dropdownActive"];
		activeDropDown.style.visibility = "hidden";
		if (!element || !element.nodeName) {
			return;
		}
	}
	if (element.style.visibility == "hidden") {
		// add data-dropdown-active attribute to show active drop down
		element.setAttribute("data-dropdown-active", "true");
		element.style.visibility = "visible";
		// close sidebar when window in clicked
		window.addEventListener("click", dropDown, { once: true });
	} else {
		delete element.dataset["dropdownActive"];
		element.style.visibility = "hidden";
	}
}

//code to toggle postals dropdown menu
const dropPostals = () => {
	if (postals.style.visibility == "hidden") {
		postals.style.visibility = "visible";
	} else {
		postals.style.visibility = "hidden";
	}
};

/**
 * function to hide or show sidebar in mobile view
 * @param {Event|undefined} e
 */
function toggleSideBar(e) {
	// validate e
	if (!e) {
		e = event;
	}
	e.stopPropagation();
	//check if styl attribute is present and display is set to block
	if (
		sidebar.hasAttribute("style") &&
		sidebar.getAttribute("style") == "display: block"
	) {
		//if present, set display to none
		sidebar.style.display = "";
		document.body.classList.toggle("no-overflow");
	} else {
		//else if absent, set style display to block
		sidebar.setAttribute("style", "display: block");
		document.body.classList.toggle("no-overflow");
		// close sidebar when window in clicked
		window.addEventListener(
			"click",
			function (e) {
				e.stopPropagation();
				toggleSideBar();
			},
			{ once: true }
		);
	}
}

/**
 * function to stop event propagation
 * @param {Event|undefined} e
 */
function stopProp(e) {
	if (!e) {
		e = event;
	}
	e.stopPropagation();
}

//javascript to toggle sidebar between just icons and icons with text
function toggleNav() {
	if (wSyd.style.width != "3.1rem" && window.innerWidth > "600") {
		wSyd.style.width = "3.1rem";
		wMain.style.left = "3.8rem";
		wMain.style.width = "calc(100% - 3.8rem)";
		let sideNames = document.getElementsByClassName("navName");
		for (let j = 0; j < sideNames.length; j++) {
			sideNames[j].style.display = "none";
		}
		let sideArrows = document.querySelectorAll(
			".arrow .fa-arrow-down, .arrow .fa-arrow-up"
		);
		for (let k = 0; k < sideArrows.length; k++) {
			// add data-display to the icon and pass the current display style as its value
			sideArrows[k].setAttribute("data-display", sideArrows[k].style.display);
			sideArrows[k].style.display = "none";
		}
	} else {
		wSyd.style.width = "";
		wMain.style.left = "";
		wMain.style.width = "";
		let sideNames = document.getElementsByClassName("navName");
		for (let j = 0; j < sideNames.length; j++) {
			setTimeout(() => {
				sideNames[j].style.display = "";
			}, 500);
		}
		let sideArrows = document.querySelectorAll(
			".arrow i.fa-arrow-down, .arrow i.fa-arrow-up"
		);
		for (let k = 0; k < sideArrows.length; k++) {
			setTimeout(() => {
				// use the value of the data-display attribute as display value to maintain existing still
				sideArrows[k].style.display = `${sideArrows[k].dataset["display"]}`;
			}, 500);
		}
	}
}

//script to rearrange page elements on screen size change
const reshape = () => {
	if (window.innerWidth <= 600) {
		sidebar.style.display = "none";
		wSyd.style.width = "0";
		wMain.style.margin = "10px";
		wBtm.style.left = "0";
		let sideNames = document.getElementsByClassName("navName");
		for (let j = 0; j < sideNames.length; j++) {
			setTimeout(() => {
				sideNames[j].style.display = "inline-block";
			}, 500);
		}
		let sideArrows = document.getElementsByClassName("arow");
		for (let k = 0; k < sideNames.length; k++) {
			setTimeout(() => {
				sideArrows[k].style.display = "inline-block";
			}, 500);
		}
	} else {
		sidebar.style.display = "block";
		wSyd.style.width = "12rem";
		wMain.style.marginLeft = "13.65rem";
		wMain.style.margin = "";
		wBtm.style.left = "13.65rem";
		let sideNames = document.getElementsByClassName("navName");
		for (let j = 0; j < sideNames.length; j++) {
			setTimeout(() => {
				sideNames[j].style.display = "inline-block";
			}, 500);
		}
		let sideArrows = document.getElementsByClassName("arow");
		for (let k = 0; k < sideNames.length; k++) {
			setTimeout(() => {
				sideArrows[k].style.display = "inline-block";
			}, 500);
		}
	}
};

//set clicked butn to active
let adminTabs = document.getElementsByClassName("redBoxBtn");
// adminTabs[0].classList.add('ad_active');
for (let b = 0; b < adminTabs.length; b++) {
	let clickedBtn = adminTabs[b];

	clickedBtn.classList.remove("ad_active");
	clickedBtn.addEventListener("click", function () {
		let current = document.getElementsByClassName("ad_active");
		counter = b;
		// If there's no active class
		if (current.length > 0) {
			current[0].className = current[0].className.replace(" ad_active", "");
		}

		// Add the active class to the current/clicked button
		this.className += " ad_active";
	});
}

function nxt(i) {
	counter++;
	let nxtSib = i.nextElementSibling;
	i.setAttribute("style", "animation-name: slideOut");
	i.style.animationDuration = "1s";
	i.style.position = "relative";
	i.style.animationIterationCount = "1";
	i.style.animationFillMode = "both";
	if (i.hasAttribute("style", "animation-name: slideOut")) {
		setTimeout(() => {
			i.setAttribute("style", "display: none");
			nxtSib.setAttribute("style", "animation-name: slideIn");
			nxtSib.style.animationDirection = "reverse";
			nxtSib.style.animationDuration = "1s";
			for (let b = 0; b < adminTabs.length; b++) {
				let currentDiv = document.getElementsByClassName("ad_active");

				// If there's no active class
				if (currentDiv.length > 0) {
					currentDiv[0].className = currentDiv[0].className.replace(
						" ad_active",
						""
					);
				}
				adminTabs[counter].className += " ad_active";
			}
		}, 500);
	}
}

function prv(i) {
	counter--;
	let prvSib = i.previousElementSibling;
	i.setAttribute("style", "animation-name: slideIn");
	i.style.animationDuration = "1s";
	i.style.position = "relative";
	i.style.animationIterationCount = "1";
	i.style.animationFillMode = "both";
	if (i.hasAttribute("style", "animation-name: slideIn")) {
		setTimeout(() => {
			i.setAttribute("style", "display: none");
			prvSib.setAttribute("style", "animation-name: slideOut");
			prvSib.style.animationDirection = "reverse";
			prvSib.style.animationDuration = "1s";
			for (let b = 0; b < adminTabs.length; b++) {
				let currentDiv = document.getElementsByClassName("ad_active");

				// If there's no active class
				if (currentDiv.length > 0) {
					currentDiv[0].className = currentDiv[0].className.replace(
						" ad_active",
						""
					);
				}
				adminTabs[counter].className += " ad_active";
			}
		}, 500);
	}
}

/**
 * function to form submittion on change
 * @param {String} url
 */
function takeAction(e) {
	let form = e;
	if (!e) {
		e = event;
		form = e.currentTarget;
	}
	form.submit();
}

/**
 * function to paginate list of items
 * @param {String} direction 'next' or 'prev'
 * @param {String} parentSelector
 * @param {String} childrenSelector
 * @param {number} limit
 * @param {Function|undefined} callback
 */
function pagination(
	direction,
	parentSelector,
	paginationControlSelector = null,
	limit = 10
) {
	// validate limit type
	if ("string" === typeof limit) {
		limit = parseInt(limit);
	}

	// get all items
	let items = document.querySelectorAll(`${parentSelector} [data-page-active]`);

	// validate if items to be paginated exists
	if (items && items.length > 0) {
		// get active items
		const activeItems = [...items]
			.map((e, index) => e.dataset["pageActive"] == "true" && `${index}`)
			.filter((e) => e && e);
		// get last get active items index
		const lastActiveItemsIndex = parseInt(activeItems[activeItems.length - 1]);
		// show or hide items for next button
		if (direction === "next" && items.length > lastActiveItemsIndex + 1) {
			const totalitemsTohandleNext = lastActiveItemsIndex + limit;
			for (let _i = 0; _i <= totalitemsTohandleNext; _i++) {
				if (_i > lastActiveItemsIndex && _i <= totalitemsTohandleNext) {
					items[_i] && (items[_i].dataset["pageActive"] = true);
				} else {
					items[_i].dataset["pageActive"] = false;
				}
			}
		}
		// show or hide items for prev button
		if (direction === "prev") {
			const totalitemsTohandlePrev = activeItems.length + limit;
			for (
				let _i2 = lastActiveItemsIndex - totalitemsTohandlePrev + 1;
				_i2 <= lastActiveItemsIndex;
				_i2++
			) {
				const state = JSON.parse(items[_i2].dataset["pageActive"]);
				items[_i2].dataset["pageActive"] = !state;
			}
		}
		// valdate controls
		valPaginationControl(lastActiveItemsIndex);
		// display count
		displayCount();
	}

	// function to validate pagination contols
	function valPaginationControl(_lastActiveItemsIndex) {
		if (direction === "next") {
			let currentActiveItems = [...items]
				.map((e, index) => e.dataset["pageActive"] == "true" && `${index}`)
				.filter((e) => e && e);
			// condition
			if (
				_lastActiveItemsIndex + currentActiveItems.length + 1 >=
				items.length
			) {
				toggleDisable(`${paginationControlSelector} [data-prev]`, false);
				toggleDisable(`${paginationControlSelector} [data-next]`, true);
			} else {
				toggleDisable(`${paginationControlSelector} [data-prev]`, false);
				toggleDisable(`${paginationControlSelector} [data-next]`, false);
			}
		}
		if (direction === "prev") {
			// condition
			if (_lastActiveItemsIndex + 1 - limit <= limit) {
				toggleDisable(`${paginationControlSelector} [data-prev]`, true);
				toggleDisable(`${paginationControlSelector} [data-next]`, false);
			} else {
				toggleDisable(`${paginationControlSelector} [data-prev]`, false);
				toggleDisable(`${paginationControlSelector} [data-next]`, false);
			}
		}
	}

	// function to display counts
	function displayCount() {
		let currentActiveItems = [...items]
			.map((e, index) => e.dataset["pageActive"] == "true" && `${index}`)
			.filter((e) => e && e);
		let countElem = document.querySelector(
			`${paginationControlSelector} [data-count]`
		);
		if (countElem) {
			countElem.textContent = `${parseInt(currentActiveItems[0]) + 1}-${
				parseInt(currentActiveItems[currentActiveItems.length - 1]) + 1
			} of ${items.length}`;
		}
	}
}

/**
 * function to toggle disabled
 * @param {String} selectorOrElement
 */
function toggleDisable(selectorOrElement, value = null) {
	if ("string" === typeof selectorOrElement) {
		selectorOrElement = document.querySelector(selectorOrElement);
	}
	selectorOrElement &&
		(selectorOrElement.disabled =
			value !== null ? value : !selectorOrElement.disabled);
}

/***js code to fetch data from json */
/*fetch('data.json')
  .then(function (response) {
	return response.json();
	})
	.then(function (data) {
		appendData(data); 
	})
	.catch(function (err) {
	console.log('error: ' + err);
});

//add data to list_bills page
function appendData(data) {
var mainTable = document.getElementById("bill-table");
for (var i = 0; i < data.length; i++) {
	var tableRow = document.createElement("tr");
	tableRow.innerHTML = ` 
	<td class="nme">${data[i].name}</td> 
	<td class="nme">${data[i].bill_no}</td> 
	<td class="nme">${data[i].date}</td> 
	<td class="nme">${data[i].charges}</td>
	<td class="nme">${data[i].paid}</td>
	<td class="nme"> ${data[i].charges - data[i].paid} </td> 
	<td class="nme actns"  >
		<a href="/delete.php?id=${data[i].id}"><i class="fa fa-fw fa-trash"></i></a>
		<a href="/edit.php?id=${data[i].id}"><i class="fa fa-fw fa-pencil-alt"></i></a>
		<a href="/find.php?id=${data[i].id}"><i class="fa fa-fw fa-search"></i></a>
	</td>`;
	mainTable.appendChild(tableRow);
  }
}
*/
/**js code for live search for patient name */

const search = document.getElementById("search");
const results = document.getElementById("result");
let search_term = "";

const showList = () => {
	if (search_term !== "") {
		results.style.display = "block";
	} else {
		results.style.display = "none";
	}

	results.innerHTML = "";
	let data = JSON.parse(jsonData);
	data
		.filter((item) => {
			return item.name.toLowerCase().includes(search_term);
		})
		.forEach((e) => {
			const div = document.createElement("div");
			div.classList.add("searchItem");
			div.innerHTML = `${e.name}`;
			div.setAttribute("onclick", `populate('${e.name}')`);
			results.appendChild(div);
		});
};
const populate = (v) => {
	search.value = "";
	search.value = v;
	results.style.display = "none";
	console.log(search.value);
};

//event listener for search
if (search) {
	search.addEventListener("input", (event) => {
		search_term = event.target.value.toLowerCase();
		showList();
	});
}

/**js code for live search for test name */

const t_search = document.getElementById("searchTest");
const t_results = document.getElementById("test_result");

const showTestList = () => {
	if (search_term !== "") {
		t_results.style.display = "block";
	} else {
		t_results.style.display = "none";
	}

	t_results.innerHTML = "";
	let data = JSON.parse(json2);
	data
		.filter((item) => {
			return item.name.toLowerCase().includes(search_term);
		})
		.forEach((e) => {
			const div = document.createElement("div");
			div.classList.add("searchItem");
			div.innerHTML = `${e.name}`;
			div.setAttribute("onclick", `t_populate('${e.name}')`);
			t_results.appendChild(div);
		});
};
const t_populate = (v) => {
	t_search.value = "";
	t_search.value = v;
	t_results.style.display = "none";
	console.log(t_search.value);
};

//event listener for search
if (t_search) {
	t_search.addEventListener("input", (event) => {
		search_term = event.target.value.toLowerCase();
		showTestList();
	});
}

/**
 *
 * @param {String|Node} modalOrSelector
 * @param {String} typeOfStyle display or visibility
 * @returns
 */
let activeModal = null;
function toggleModal(
	modalOrSelector,
	typeOfStyle = "display",
	valueOfStyle = "block",
	e
) {
	if (!e) {
		e = event;
	}
	e.stopPropagation();
	// clear window event listeners
	window.removeEventListener("click", toggleModal, { once: true });
	// get element & update activeModal on global scope
	if ("string" === typeof modalOrSelector) {
		activeModal = document.querySelector(modalOrSelector);
	} else if (modalOrSelector instanceof Node) {
		activeModal = modalOrSelector;
	} else if (modalOrSelector instanceof NodeList) {
		activeModal = modalOrSelector[0];
	}
	if (!activeModal) {
		return;
	}
	// get current style property
	let currentDisplay =
		activeModal.style[typeOfStyle] ||
		getComputedStyle(activeModal)[typeOfStyle] ||
		null;
	if (!currentDisplay) {
		return;
	}
	// check if modal is not displayed and display
	if (currentDisplay !== valueOfStyle) {
		activeModal.style[typeOfStyle] = valueOfStyle;
		document.body.classList.toggle("no-overflow");
		// window click
		window.addEventListener("click", toggleModal, { once: true });
	} else {
		activeModal.style[typeOfStyle] = "";
		document.body.classList.toggle("no-overflow");
	}
}

