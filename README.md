# ⚡ Virtual Scroll Datatable for Salesforce

A high-performance Lightning Web Component (LWC) built to handle **large datasets** efficiently with **virtual scrolling**, **searching**, and **sorting**, while also being fully compatible with **Salesforce Flows** and **LWC use cases**.

---

## 🎯 Use Case

Salesforce native components like `lightning-datatable` render all rows at once — which leads to:

* Performance drops
* Browser freezes
* Inefficient user experience on large datasets

This LWC solves that by rendering **only visible rows**, keeping memory and DOM usage extremely low.

---

## 🚨 Native vs. Custom vs. Virtual Scroll Table

| Problem              | Native Datatable | Basic Custom Table | Virtual Scroll Table |
| -------------------- | ---------------- | ------------------ | -------------------- |
| Handles 500+ records | Laggy or crashes | Renders all rows   | Only visible rows    |
| Flow support         | Complex setup    | Not reusable       | Plug-and-play        |
| Sticky header        | Unreliable       | Difficult to style | Sticky + styled      |
| Column sorting       | Built-in         | Manual             | Customizable         |
| Scroll + performance | Full re-render   | Full DOM load      | Virtualized rows     |

---

## ⚒️ How it Works:
![325571845-872ef61f-e303-49a4-b4a3-45026a57a44a](https://github.com/user-attachments/assets/75b2284c-a8aa-45a6-ad64-e528a9681a24)


## ✅ Features

* 🔹 **Virtual scrolling** for thousands of records
* 🔹 **Sticky headers**
* 🔹 **Column sorting**
* 🔹 **Fallback sample data** if nothing is passed
* 🔹 Works inside **Lightning Flows** or **any LWC context**
* 🔹 **Custom table height**
* 🔹 **Dynamic columns** via JSON

---

## 🔌 Integration Guide

## 🪴 To use this component in your Salesforce org, follow these steps:
1. Clone the Repository: Clone this repository to your local machine.
2. Deploy the Component: Use the Salesforce CLI to deploy the `scrollEngine` Lightning Web Component to your Salesforce org.

### 🔸 Inputs

| API Property  | Type   | Required | Description                                            |
| ------------- | ------ | -------- | ------------------------------------------------------ |
| `columns`     | String | ✅        | JSON string of column objects (`{ label, fieldName }`) |
| `data`        | String | ✅        | JSON string array of data records                      |
| `tableHeight` | Number | ❌        | Height of the table in pixels (default: `300`)         |

---

### 🔸 Usage in Another LWC

```html
<c-scroll-engine
    columns={myColumns}
    data={myData}
    table-height="400"
></c-scroll-engine>
```

```js
myColumns = JSON.stringify([
  { label: 'Name', fieldName: 'name' },
  { label: 'Email', fieldName: 'email' }
]);

myData = JSON.stringify([
  { name: 'User A', email: 'a@example.com' },
  { name: 'User B', email: 'b@example.com' }
]);
```

---

### 🔸 Usage in Salesforce Flow

1. Drag the component onto a **Flow Screen**.
2. Set the **`columns`** input to a JSON string like:

```json
[{"label": "Name", "fieldName": "name"}, {"label": "Status", "fieldName": "status"}]
```

3. Set the **`data`** input to a JSON array of records like:

```json
[{"name": "ABC Corp", "status": "Active"}, {"name": "XYZ Inc", "status": "Inactive"}]
```

4. Optionally, set **`tableHeight`** (e.g., `400`).

---

## 👏 Credits & Contribution

This component is community-built to address a **common scalability gap** in Salesforce UI design.
Feel free to **fork**, **extend**, or **open a PR** to improve it further!
