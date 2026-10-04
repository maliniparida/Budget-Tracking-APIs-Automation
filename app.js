/* =====================================================
   PLANPRO APP
   Frontend only
   HTML + CSS + JavaScript + LocalStorage
===================================================== */


/* =====================================================
   LOGIN PROTECTION
===================================================== */

if (localStorage.getItem("loggedIn") !== "true") {

    window.location.href = "index.html";

}


/* =====================================================
   DATA
===================================================== */

let events =
    JSON.parse(localStorage.getItem("events")) || [

        {
            id: 1,
            name: "Annual Tech Fest",
            venue: "Convention Hall",
            date: "2026-10-10",
            time: "10:00",
            manager: "Rahul Sharma",
            status: "Planned",
            budget: 500000,
            spent: 180000,
            pending: 45000,

            sponsor: "Tech India",
            sponsorAmount: 100000,

            resources: [
                "Caterer",
                "Sound and Light",
                "Decorator",
                "Seating",
                "Security"
            ]
        },


        {
            id: 2,
            name: "Cultural Night",
            venue: "University Auditorium",
            date: "2026-09-30",
            time: "18:00",
            manager: "Priya Das",
            status: "Ongoing",
            budget: 300000,
            spent: 210000,
            pending: 25000,

            sponsor: "Creative Arts",
            sponsorAmount: 60000,

            resources: [
                "Caterer",
                "Sound and Light",
                "Entertainment & Talent Agency",
                "Photographer & Videographer"
            ]
        },


        {
            id: 3,
            name: "Sports Meet",
            venue: "College Ground",
            date: "2026-08-20",
            time: "08:00",
            manager: "Amit Kumar",
            status: "Completed",
            budget: 200000,
            spent: 195000,
            pending: 5000,

            sponsor: "Sports Club",
            sponsorAmount: 40000,

            resources: [
                "Security",
                "Seating",
                "Housekeeping & Waste Management",
                "Tech & Ticketing Provider"
            ]
        }

    ];


let vendors =
    JSON.parse(localStorage.getItem("vendors")) || [

        {
            id: "VEN-001",
            name: "Royal Caterers",
            category: "Caterer & Bartender",
            email: "royal@example.com",
            phone: "9876543210",
            event: "Annual Tech Fest"
        },


        {
            id: "VEN-002",
            name: "Sound Pro",
            category: "AV & Production",
            email: "soundpro@example.com",
            phone: "9876543211",
            event: "Cultural Night"
        },


        {
            id: "VEN-003",
            name: "Dream Decor",
            category: "Decorator & Florist",
            email: "dream@example.com",
            phone: "9876543212",
            event: ""
        },


        {
            id: "VEN-004",
            name: "Secure Guard",
            category: "Security Agency",
            email: "secure@example.com",
            phone: "9876543213",
            event: "Sports Meet"
        }

    ];


let sponsorships =
    JSON.parse(localStorage.getItem("sponsorships")) || [

        {
            event: "Annual Tech Fest",
            sponsor: "Tech India",
            amount: 100000,
            status: "Confirmed"
        },


        {
            event: "Cultural Night",
            sponsor: "Creative Arts",
            amount: 60000,
            status: "Confirmed"
        },


        {
            event: "Sports Meet",
            sponsor: "Sports Club",
            amount: 40000,
            status: "Confirmed"
        }

    ];


let alerts =
    JSON.parse(localStorage.getItem("alerts")) || [];


/* =====================================================
   SAVE DATA
===================================================== */

function saveData() {

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );

    localStorage.setItem(
        "vendors",
        JSON.stringify(vendors)
    );

    localStorage.setItem(
        "sponsorships",
        JSON.stringify(sponsorships)
    );

    localStorage.setItem(
        "alerts",
        JSON.stringify(alerts)
    );

}


/* =====================================================
   CURRENCY
===================================================== */

function money(number) {

    return "₹" +
        Number(number || 0).toLocaleString("en-IN");

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageName) {

    document
        .querySelectorAll(".page")
        .forEach(function(page) {

            page.classList.remove("active");

        });


    const selected =
        document.getElementById(pageName);


    if (selected) {

        selected.classList.add("active");

    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(function(button) {

            button.classList.remove("active");

            if (
                button.dataset.page === pageName
            ) {

                button.classList.add("active");

            }

        });


    updatePageData(pageName);

}


function updatePageData(page) {

    if (page === "dashboard") {

        renderDashboard();

    }

    if (page === "events") {

        renderEvents();

    }

    if (page === "vendors") {

        renderVendors();

    }

    if (page === "budget") {

        renderBudget();

    }

    if (page === "sponsorship") {

        renderSponsorship();

    }

    if (page === "alerts") {

        renderAlerts();

    }

}


/* =====================================================
   NAV BUTTONS
===================================================== */

document
    .querySelectorAll(".nav-btn")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                showPage(
                    button.dataset.page
                );

            }
        );

    });


/* =====================================================
   DASHBOARD
===================================================== */

function renderDashboard() {

    let totalBudget = 0;

    let totalSpent = 0;

    let activeEvents = 0;


    events.forEach(function(event) {

        totalBudget += Number(event.budget);

        totalSpent += Number(event.spent);

        if (
            event.status === "Planned" ||
            event.status === "Ongoing"
        ) {

            activeEvents++;

        }

    });


    let budgetLeft =
        totalBudget - totalSpent;


    document.getElementById(
        "dashTotalBudget"
    ).textContent = money(totalBudget);


    document.getElementById(
        "dashBudgetLeft"
    ).textContent = money(budgetLeft);


    document.getElementById(
        "dashEvents"
    ).textContent = events.length;


    document.getElementById(
        "dashVendors"
    ).textContent = vendors.length;


    document.getElementById(
        "chartAllocated"
    ).textContent = money(totalBudget);


    document.getElementById(
        "chartSpent"
    ).textContent = money(totalSpent);


    document.getElementById(
        "chartRemaining"
    ).textContent = money(budgetLeft);


    let percentage = 0;


    if (totalBudget > 0) {

        percentage =
            Math.round(
                (totalSpent / totalBudget) * 100
            );

    }


    if (percentage > 100) {

        percentage = 100;

    }


    document.getElementById(
        "budgetPercent"
    ).textContent =
        percentage + "%";


    document.querySelector(
        ".budget-circle"
    ).style.background =
        `conic-gradient(
            var(--primary) 0deg,
            var(--primary2) ${percentage * 3.6}deg,
            #252d45 ${percentage * 3.6}deg
        )`;


    renderStatusChart();

    renderEventBudgetChart();

    renderVendorChart();

    renderDashboardEvents();

}


/* =====================================================
   EVENT STATUS CHART
===================================================== */

function renderStatusChart() {

    const container =
        document.getElementById(
            "statusChart"
        );


    container.innerHTML = "";


    const statuses = [
        "Planned",
        "Ongoing",
        "Completed"
    ];


    statuses.forEach(function(status) {

        const count =
            events.filter(
                event =>
                    event.status === status
            ).length;


        let percent = 0;


        if (events.length > 0) {

            percent =
                Math.round(
                    (count / events.length) * 100
                );

        }


        container.innerHTML += `

            <div class="status-row">

                <span>
                    ${status}
                </span>

                <div class="status-track">

                    <div
                        class="status-fill"
                        style="width:${percent}%"
                    ></div>

                </div>

                <strong>
                    ${count}
                </strong>

            </div>

        `;

    });

}


/* =====================================================
   EVENT BUDGET CHART
===================================================== */

function renderEventBudgetChart() {

    const container =
        document.getElementById(
            "eventBudgetChart"
        );


    container.innerHTML = "";


    if (events.length === 0) {

        container.innerHTML =
            "<p>No events available.</p>";

        return;

    }


    let maxBudget =
        Math.max(
            ...events.map(
                event =>
                    Number(event.budget)
            )
        );


    events.forEach(function(event) {

        let percentage =
            (event.budget / maxBudget) * 100;


        container.innerHTML += `

            <div class="bar-row">

                <label>
                    ${event.name}
                </label>

                <div class="bar-track">

                    <div
                        class="bar-fill"
                        style="width:${percentage}%"
                    ></div>

                </div>

                <strong>
                    ${money(event.budget)}
                </strong>

            </div>

        `;

    });

}


/* =====================================================
   VENDOR CHART
===================================================== */

function renderVendorChart() {

    const container =
        document.getElementById(
            "vendorAllocationChart"
        );


    container.innerHTML = "";


    const assigned =
        vendors.filter(
            vendor => vendor.event !== ""
        ).length;


    const unassigned =
        vendors.length - assigned;


    const total =
        vendors.length || 1;


    const assignedPercent =
        Math.round(
            (assigned / total) * 100
        );


    const unassignedPercent =
        Math.round(
            (unassigned / total) * 100
        );


    container.innerHTML = `

        <div class="status-row">

            <span>
                Assigned
            </span>

            <div class="status-track">

                <div
                    class="status-fill"
                    style="width:${assignedPercent}%"
                ></div>

            </div>

            <strong>
                ${assigned}
            </strong>

        </div>


        <div class="status-row">

            <span>
                Available
            </span>

            <div class="status-track">

                <div
                    class="status-fill"
                    style="width:${unassignedPercent}%"
                ></div>

            </div>

            <strong>
                ${unassigned}
            </strong>

        </div>

    `;

}


/* =====================================================
   DASHBOARD EVENT TABLE
===================================================== */

function renderDashboardEvents() {

    const table =
        document.getElementById(
            "dashboardEventsTable"
        );


    table.innerHTML = "";


    events
        .slice(0, 5)
        .forEach(function(event) {

            table.innerHTML += `

                <tr>

                    <td>
                        <strong>
                            ${event.name}
                        </strong>
                    </td>

                    <td>
                        ${event.venue}
                    </td>

                    <td>
                        ${event.date}
                    </td>

                    <td>
                        ${statusBadge(event.status)}
                    </td>

                    <td>
                        ${money(event.budget)}
                    </td>

                </tr>

            `;

        });

}


/* =====================================================
   STATUS BADGE
===================================================== */

function statusBadge(status) {

    let className =
        status.toLowerCase();


    return `
        <span class="badge ${className}">
            ${status}
        </span>
    `;

}


/* =====================================================
   EVENTS TABLE
===================================================== */

function renderEvents() {

    const table =
        document.getElementById(
            "eventsTable"
        );


    table.innerHTML = "";


    const search =
        (
            document.getElementById(
                "eventSearch"
            )?.value || ""
        )
        .toLowerCase();


    const filter =
        document.getElementById(
            "eventStatusFilter"
        )?.value || "all";


    events
        .filter(function(event) {

            const matchSearch =
                event.name
                    .toLowerCase()
                    .includes(search);


            const matchStatus =
                filter === "all" ||
                event.status === filter;


            return (
                matchSearch &&
                matchStatus
            );

        })
        .forEach(function(event) {

            table.innerHTML += `

                <tr>

                    <td>
                        <strong>
                            ${event.name}
                        </strong>
                    </td>

                    <td>
                        ${event.venue}
                    </td>

                    <td>
                        ${event.date}
                        <br>
                        <small>
                            ${event.time}
                        </small>
                    </td>

                    <td>
                        ${event.manager}
                    </td>

                    <td>
                        ${statusBadge(event.status)}
                    </td>

                    <td>
                        ${money(event.budget)}
                    </td>

                    <td>

                        <button
                            class="small-btn"
                            onclick="viewEvent(${event.id})"
                        >
                            View Details
                        </button>

                    </td>

                </tr>

            `;

        });

}


/* =====================================================
   EVENT SEARCH
===================================================== */

document
    .getElementById("eventSearch")
    ?.addEventListener(
        "input",
        renderEvents
    );


document
    .getElementById("eventStatusFilter")
    ?.addEventListener(
        "change",
        renderEvents
    );


/* =====================================================
   CREATE EVENT
===================================================== */

function openEventModal() {

    document
        .getElementById("eventModal")
        .classList.add("show");

}


document
    .getElementById("createEventBtn")
    .addEventListener(
        "click",
        openEventModal
    );


document
    .getElementById("createEventBtn2")
    .addEventListener(
        "click",
        openEventModal
    );


document
    .getElementById("eventForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const form =
                new FormData(event.target);


            const resources =
                Array.from(
                    document.querySelectorAll(
                        'input[name="resources"]:checked'
                    )
                )
                .map(
                    checkbox =>
                        checkbox.value
                );


            const newEvent = {

                id:
                    Date.now(),

                name:
                    form.get("name"),

                venue:
                    form.get("venue"),

                date:
                    form.get("date"),

                time:
                    form.get("time"),

                manager:
                    form.get("manager"),

                status:
                    "Planned",

                budget:
                    Number(
                        form.get("budget")
                    ),

                spent:
                    0,

                pending:
                    0,

                sponsor:
                    form.get("sponsor"),

                sponsorAmount:
                    Number(
                        form.get(
                            "sponsorAmount"
                        ) || 0
                    ),

                resources:
                    resources

            };


            events.push(newEvent);


            if (
                newEvent.sponsor &&
                newEvent.sponsorAmount > 0
            ) {

                sponsorships.push({

                    event:
                        newEvent.name,

                    sponsor:
                        newEvent.sponsor,

                    amount:
                        newEvent.sponsorAmount,

                    status:
                        "Confirmed"

                });

            }


            saveData();


            event.target.reset();


            closeModal("eventModal");


            renderDashboard();

            renderEvents();

            renderBudget();

            renderSponsorship();


            alert(
                "Event created successfully!"
            );

        }
    );


/* =====================================================
   VIEW EVENT
===================================================== */

function viewEvent(id) {

    const event =
        events.find(
            item => item.id === id
        );


    if (!event) return;


    const details =
        document.getElementById(
            "eventDetails"
        );


    details.innerHTML = `

        <div class="details-grid">

            <div class="detail-box">
                <span>Event Name</span>
                <strong>${event.name}</strong>
            </div>

            <div class="detail-box">
                <span>Venue</span>
                <strong>${event.venue}</strong>
            </div>

            <div class="detail-box">
                <span>Date</span>
                <strong>${event.date}</strong>
            </div>

            <div class="detail-box">
                <span>Time</span>
                <strong>${event.time}</strong>
            </div>

            <div class="detail-box">
                <span>Event Manager</span>
                <strong>${event.manager}</strong>
            </div>

            <div class="detail-box">
                <span>Status</span>
                <strong>${event.status}</strong>
            </div>

            <div class="detail-box">
                <span>Budget</span>
                <strong>${money(event.budget)}</strong>
            </div>

            <div class="detail-box">
                <span>Spent</span>
                <strong>${money(event.spent)}</strong>
            </div>

            <div class="detail-box">
                <span>Sponsor</span>
                <strong>${event.sponsor || "No sponsor"}</strong>
            </div>

            <div class="detail-box">
                <span>Sponsorship</span>
                <strong>${money(event.sponsorAmount)}</strong>
            </div>

        </div>


        <div class="panel">

            <h3>Required Resources</h3>

            <br>

            <p>
                ${
                    event.resources.length
                    ? event.resources.join(" • ")
                    : "No resources selected"
                }
            </p>

        </div>

    `;


    document
        .getElementById("detailsModal")
        .classList.add("show");

}


/* =====================================================
   VENDORS
===================================================== */

function renderVendors() {

    const table =
        document.getElementById(
            "vendorsTable"
        );


    table.innerHTML = "";


    const search =
        (
            document.getElementById(
                "vendorSearch"
            )?.value || ""
        )
        .toLowerCase();


    const filter =
        document.getElementById(
            "vendorAssignmentFilter"
        )?.value || "all";


    vendors
        .filter(function(vendor) {

            const matchSearch =
                vendor.name
                    .toLowerCase()
                    .includes(search);


            let matchFilter = true;


            if (filter === "assigned") {

                matchFilter =
                    vendor.event !== "";

            }


            if (filter === "unassigned") {

                matchFilter =
                    vendor.event === "";

            }


            return (
                matchSearch &&
                matchFilter
            );

        })
        .forEach(function(vendor) {

            table.innerHTML += `

                <tr>

                    <td>
                        ${vendor.id}
                    </td>

                    <td>
                        <strong>
                            ${vendor.name}
                        </strong>
                    </td>

                    <td>
                        ${vendor.category}
                    </td>

                    <td>
                        ${vendor.email}
                    </td>

                    <td>
                        ${vendor.phone}
                    </td>

                    <td>
                        ${
                            vendor.event ||
                            "Not Assigned"
                        }
                    </td>

                    <td>

                        ${
                            vendor.event
                            ? `<span class="badge assigned">Assigned</span>`
                            : `<span class="badge unassigned">Unassigned</span>`
                        }

                    </td>

                    <td>

                        <button
                            class="small-btn"
                            onclick="viewVendor('${vendor.id}')"
                        >
                            View Details
                        </button>

                    </td>

                </tr>

            `;

        });

}


/* =====================================================
   VENDOR SEARCH
===================================================== */

document
    .getElementById("vendorSearch")
    ?.addEventListener(
        "input",
        renderVendors
    );


document
    .getElementById("vendorAssignmentFilter")
    .addEventListener(
        "change",
        renderVendors
    );


/* =====================================================
   ADD VENDOR
===================================================== */

document
    .getElementById("addVendorBtn")
    .addEventListener(
        "click",
        function() {

            populateEventSelects();

            document
                .getElementById(
                    "vendorModal"
                )
                .classList.add("show");

        }
    );


document
    .getElementById("vendorForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const form =
                new FormData(event.target);


            const vendor = {

                id:
                    "VEN-" +
                    String(
                        vendors.length + 1
                    )
                    .padStart(3, "0"),

                name:
                    form.get("name"),

                category:
                    form.get("category"),

                email:
                    form.get("email"),

                phone:
                    form.get("phone"),

                event:
                    form.get("event")

            };


            vendors.push(vendor);


            saveData();


            event.target.reset();


            closeModal("vendorModal");


            renderVendors();

            renderDashboard();

            alert(
                "Vendor added successfully!"
            );

        }
    );


/* =====================================================
   VIEW VENDOR
===================================================== */

function viewVendor(id) {

    const vendor =
        vendors.find(
            item => item.id === id
        );

    if (!vendor) return;

    const details =
        document.getElementById("vendorDetails");

    details.innerHTML = `
        <div class="details-grid vendor-details-grid">

            <div class="detail-box">
                <span>Vendor ID</span>
                <strong>${vendor.id}</strong>
            </div>

            <div class="detail-box">
                <span>Vendor Name</span>
                <strong>${vendor.name}</strong>
            </div>

            <div class="detail-box">
                <span>Category</span>
                <strong>${vendor.category}</strong>
            </div>

            <div class="detail-box">
                <span>Email</span>
                <strong>${vendor.email}</strong>
            </div>

            <div class="detail-box">
                <span>Phone</span>
                <strong>${vendor.phone}</strong>
            </div>

            <div class="detail-box">
                <span>Assigned Event</span>
                <strong>${vendor.event || "Unassigned"}</strong>
            </div>

            <div class="detail-box vendor-status-box">
                <span>Status</span>
                ${
                    vendor.event
                    ? '<strong><span class="badge assigned">Assigned</span></strong>'
                    : '<strong><span class="badge unassigned">Unassigned</span></strong>'
                }
            </div>

        </div>
    `;

    document
        .getElementById("vendorDetailsModal")
        .classList.add("show");
}


/* =====================================================
   POPULATE EVENT SELECTS
===================================================== */

function populateEventSelects() {

    const vendorSelect =
        document.getElementById(
            "vendorEventSelect"
        );


    const sponsorSelect =
        document.getElementById(
            "sponsorEventSelect"
        );


    vendorSelect.innerHTML =
        `<option value="">Unassigned</option>`;


    sponsorSelect.innerHTML = "";


    events.forEach(function(event) {

        vendorSelect.innerHTML += `

            <option value="${event.name}">
                ${event.name}
            </option>

        `;


        sponsorSelect.innerHTML += `

            <option value="${event.name}">
                ${event.name}
            </option>

        `;

    });

}


/* =====================================================
   BUDGET
===================================================== */

function renderBudget() {

    let allocated = 0;

    let spent = 0;

    let pending = 0;


    events.forEach(function(event) {

        allocated += Number(
            event.budget
        );

        spent += Number(
            event.spent
        );

        pending += Number(
            event.pending
        );

    });


    const balance =
        allocated - spent - pending;


    document.getElementById(
        "budgetAllocated"
    ).textContent =
        money(allocated);


    document.getElementById(
        "budgetSpent"
    ).textContent =
        money(spent);


    document.getElementById(
        "budgetPending"
    ).textContent =
        money(pending);


    document.getElementById(
        "budgetBalance"
    ).textContent =
        money(balance);


    const table =
        document.getElementById(
            "budgetTable"
        );


    table.innerHTML = "";


    events.forEach(function(event) {

        const balance =
            event.budget -
            event.spent -
            event.pending;


        table.innerHTML += `

            <tr>

                <td>
                    <strong>
                        ${event.name}
                    </strong>
                </td>

                <td>
                    ${money(event.budget)}
                </td>

                <td>
                    ${money(event.spent)}
                </td>

                <td>
                    ${money(event.pending)}
                </td>

                <td>
                    ${event.resources.length}
                </td>

                <td>
                    ${money(balance)}
                </td>

            </tr>

        `;

    });

}


/* =====================================================
   SPONSORSHIP
===================================================== */

function renderSponsorship() {

    const table =
        document.getElementById(
            "sponsorshipTable"
        );


    table.innerHTML = "";


    let total = 0;


    sponsorships.forEach(function(item) {

        total += Number(
            item.amount
        );


        table.innerHTML += `

            <tr>

                <td>
                    ${item.event}
                </td>

                <td>
                    ${item.sponsor}
                </td>

                <td>
                    ${money(item.amount)}
                </td>

                <td>

                    <span class="badge completed">
                        ${item.status}
                    </span>

                </td>

            </tr>

        `;

    });


    document.getElementById(
        "totalSponsorship"
    ).textContent =
        money(total);

}


/* =====================================================
   ADD SPONSORSHIP
===================================================== */

document
    .getElementById("addSponsorBtn")
    .addEventListener(
        "click",
        function() {

            populateEventSelects();

            document
                .getElementById(
                    "sponsorModal"
                )
                .classList.add("show");

        }
    );


document
    .getElementById("sponsorForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const form =
                new FormData(event.target);


            const sponsorship = {

                event:
                    form.get("event"),

                sponsor:
                    form.get("sponsor"),

                amount:
                    Number(
                        form.get("amount")
                    ),

                status:
                    "Confirmed"

            };


            sponsorships.push(
                sponsorship
            );


            saveData();


            event.target.reset();


            closeModal(
                "sponsorModal"
            );


            renderSponsorship();


            alert(
                "Sponsorship added successfully!"
            );

        }
    );


/* =====================================================
   ALERT SYSTEM
===================================================== */

document
    .getElementById("sendAlertBtn")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "alertModal"
                )
                .classList.add("show");

        }
    );


document
    .getElementById("alertForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const form =
                new FormData(event.target);


            const alertData = {

                audience:
                    form.get("audience"),

                message:
                    form.get("message"),

                time:
                    new Date().toLocaleString()

            };


            alerts.unshift(
                alertData
            );


            saveData();


            closeModal(
                "alertModal"
            );


            event.target.reset();


            showAlarm(
                alertData
            );


            renderAlerts();

        }
    );


/* =====================================================
   SHOW ALARM
===================================================== */

function showAlarm(data) {

    document.getElementById(
        "alarmText"
    ).textContent =
        data.message;


    document.getElementById(
        "alarmTarget"
    ).textContent =
        data.audience;


    document
        .getElementById(
            "alarmOverlay"
        )
        .classList.add("show");


    startAlarmSound();

}


/* =====================================================
   ALARM SOUND
===================================================== */

let alarmInterval = null;

let audioContext = null;


function startAlarmSound() {

    stopAlarmSound();


    try {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        alarmInterval =
            setInterval(
                function() {

                    const oscillator =
                        audioContext.createOscillator();

                    const gain =
                        audioContext.createGain();


                    oscillator.type =
                        "sine";


                    oscillator.frequency.value =
                        800;


                    gain.gain.value =
                        0.08;


                    oscillator.connect(
                        gain
                    );


                    gain.connect(
                        audioContext.destination
                    );


                    oscillator.start();


                    oscillator.stop(
                        audioContext.currentTime +
                        0.25
                    );

                },
                700
            );

    }

    catch(error) {

        console.log(
            "Alarm sound unavailable."
        );

    }

}


/* =====================================================
   STOP ALARM
===================================================== */

function stopAlarmSound() {

    if (alarmInterval) {

        clearInterval(
            alarmInterval
        );

        alarmInterval = null;

    }


    if (audioContext) {

        audioContext.close();

        audioContext = null;

    }

}


document
    .getElementById("stopAlarm")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "alarmOverlay"
                )
                .classList.remove("show");


            stopAlarmSound();

        }
    );


/* =====================================================
   ALERT HISTORY
===================================================== */

function renderAlerts() {

    const container =
        document.getElementById(
            "alertHistory"
        );


    container.innerHTML = "";


    if (alerts.length === 0) {

        container.innerHTML = `

            <p style="color:#929bb0">
                No urgent alerts have been sent.
            </p>

        `;

        return;

    }


    alerts.forEach(function(item) {

        container.innerHTML += `

            <div class="alert-history">

                <div>

                    <strong>
                        ⚠ ${item.audience}
                    </strong>

                    <p>
                        ${item.message}
                    </p>

                </div>

                <small>
                    ${item.time}
                </small>

            </div>

        `;

    });

}


/* =====================================================
   MODAL CLOSE
===================================================== */

function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");

}


document
    .querySelectorAll(
        "[data-close]"
    )
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                closeModal(
                    button.dataset.close
                );

            }
        );

    });


/* Close modal when clicking outside */

document
    .querySelectorAll(".modal")
    .forEach(function(modal) {

        modal.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    });


/* =====================================================
   LOGOUT
===================================================== */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "loggedIn"
            );

            window.location.href =
                "index.html";

        }
    );


/* =====================================================
   INITIAL LOAD
===================================================== */

saveData();

renderDashboard();

renderEvents();

renderVendors();

renderBudget();

renderSponsorship();

renderAlerts();

populateEventSelects();