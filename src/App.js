import { useState, useEffect } from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiReq from './ApiReq';

// function Header() {
//   return (
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>Hello { TestFunctions.handleNameChanges() }!</p>

//     </header>
//   )
// }

function App() {
	const API_URL = 'http://localhost:3001/items';

	// const [items, setItems] = useState([]);
	const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
	const [newItem, setNewItem] = useState('');
	const [search, setSearch] = useState('');
	const [fetchErr, setFetchErr] = useState(null);
	const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		localStorage.setItem('shoppinglist', JSON.stringify(items));
	}, [items]);
	// useEffect(() => {
	// 	const fetchItem = async () => {
	// 		try {
	// 			const response = await fetch(API_URL);
	// 			if (!response.ok) throw Error('Did not received expected data!');
	// 			const listItems = await response.json();
	// 			setItems(listItems);
	// 			setFetchErr(null);
	// 		} catch (error) {
	// 			setFetchErr(error.message);
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	};

	// 	setTimeout(() => {
	// 		(async () => await fetchItem())();
	// 	}, 2000);
	// }, []);

	const addItem = async (item) => {
		const id = items.length ? items[items.length - 1].id + 1 : 1;
		const jsonNewItem = { id, checked: false, item };
		const listItems = [...items, jsonNewItem];
		setItems(listItems);

		const postOpts = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(jsonNewItem),
		};
		const result = await apiReq(API_URL, postOpts);
		if (result) setFetchErr(result);
	};

	const handleCheck = async (id) => {
		const listItems = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
		setItems(listItems);

		const myItem = listItems.filter((item) => item.id === id);
		const updateOps = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ checked: myItem[0].checked }),
		};
		const reqUrl = `${API_URL}/${id}`;
		const result = await apiReq(reqUrl, updateOps);
		if (result) setFetchErr(result);
	};

	const handleDelete = async (id) => {
		const listItems = items.filter((item) => item.id !== id);
		setItems(listItems);

		const deleteOpts = { method: 'DELETE' };
		const reqUrl = `${API_URL}/${id}`;
		const result = await apiReq(reqUrl, deleteOpts);
		if (result) setFetchErr(result);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newItem) return;
		addItem(newItem);
		setNewItem('');
	};

	return (
		<div className="App">
			{/*
			 * Use < FuncName /> to init the partials funcs
			 * This example func below includes a header.
			 */}
			<Header title={'Groceries'} />
			<AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
			<SearchItem search={search} setSearch={setSearch} />
			<main>
				<Content
					items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
					handleCheck={handleCheck}
					handleDelete={handleDelete}
				/>
				{/* {isLoading && <p>Loading items...</p>}
				{fetchErr && (
					<p
						style={{
							color: 'red',
						}}
					>
						{`Error: ${fetchErr}`}
					</p>
				)}

				{!fetchErr && !isLoading && (
					<Content items={items.filter((item) => item.item.toLowerCase().includes(search.toLowerCase()))} handleCheck={handleCheck} handleDelete={handleDelete} />
				)} */}
			</main>
			<Footer length={items.filter((item) => item.item.toLowerCase().includes(search.toLowerCase())).length} />

			{/* The other simpler solution */}
			{/* {Header()} */}
			{/* Use the braces for the variables. */}
		</div>
	);
}

export default App;
