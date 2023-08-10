let GetById = (id) => {return document.getElementById(id); }
let GetByClass = (cls) => {return document.getElementByClass(cls); }
let GetElement = (tag) => {return document.querySelector(tag); }

let dimmer = GetById("app__dimmer");
let paginator_pos = 0;

const BOOK_RACK = GetById("book-list")

function Book(title, author, cover_link, synopsis) {
	this.title = title;
	this.author = author;
	this.cover = cover_link;
	this.synopsis = synopsis;
}

let book_list = new Array();

function initialize_site() {
	let body = GetElement("body");
	let new_book_form = GetById("new-book-popup")

	let new_book_open = GetById("button--rack-new-book")
	new_book_open.addEventListener("click", () => {
		dimmer.style.display = "block";
		new_book_form.style.display = "block";
		body.style.overflow = "visible";
	})


	let button = GetById("new-book__exit");
	button.addEventListener("click", () => {
		dimmer.style.display = "none";
		new_book_form.style.display = "none";
		body.style.overflow = "visible";
	})

	button = GetById("new-book__add");
	button.addEventListener("click", () => {
		handle_new_book();
		dimmer.style.display = "none";
		new_book_form.style.display = "none";
		body.style.overflow = "visible";
	})

	button = GetById("button--rack-prev-group");
	button.addEventListener("click", () => {
		handle_paginator(-1);
	})

	button = GetById("button--rack-next-group");
	button.addEventListener("click", () => {
		handle_paginator(1);
	})
}

function preload_books() {
	book_list.push(new Book("My Immortal", "Tara Gillesbie",
		"https://m.media-amazon.com/images/I/41E2ea3d1iL.jpg",
		"My Immortal is the most famous, notoriously bad fan fiction ever written. Based very loosely in the Harry Potter universe and featuring the blatant Mary-Sue protagonist Ebony (or often times \"Enoby\"), it reads like a detailed list of everything a fanfic author could ever possibly do wrong, only taken to exaggerated, horrifying extremes. My Immortal was originally posted to FanFiction.Net sometime in 2006, but was subsequently deleted by the FF.Net staff after causing a severe drop in the site's collective IQ. In fact, the fanfic is so unbelievably bad that many refuse to accept that it's real, insisting that the author was only trolling and that the story is really a parody. Regardless of the author's intent, My Immortal remains one of the most cringe-worthy, unintentionally hilarious, so-bad-it's-good pieces of literature the internet has ever produced."),
	)
	book_list.push(new Book("Harry Potter and The Philosopher Stone", "J.K. Rowling",
		"https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale/jackets/9781408855652.jpg",
		"I don't know, Man"),
	)
	book_list.push(new Book("Empress Theresa", "Norman Boutin",
		"https://static.wikia.nocookie.net/empress-theresa/images/4/49/ET-2018-upload.jpg/revision/latest/scale-to-width-down/1000?cb=20191216004640",
		"I don't know, Man"),
	)
	book_list.push(new Book("Ayah", "Andrea Hirata",
		"https://upload.wikimedia.org/wikipedia/id/thumb/f/f3/Ayah_%28novel%29.jpeg/220px-Ayah_%28novel%29.jpeg",
		"Sabari memiliki 3 sahabat yaitu Ukun, Tamat, dan Toharun yang selalu bersama dengan kekonyolannya. Sabari awalnya tidak tertarik dengan yang namanya cinta, tetapi setelah Marlena memberikan sebuah pensil sebagai hadiah karena Marlena mengambil kertas jawabannya, sejak itu Sabari berubah 180° dari biasanya."),
	)
	book_list.push(new Book("Laskar Pelangi", "Andrea Hirata",
		"https://upload.wikimedia.org/wikipedia/id/thumb/8/8e/Laskar_pelangi_sampul.jpg/220px-Laskar_pelangi_sampul.jpg",
		"Cerita terjadi di desa Gantung, Belitung Timur. Dimulai ketika sekolah Muhammadiyah terancam akan dibubarkan oleh Depdikbud Sumsel jikalau tidak mencapai siswa baru sejumlah 10 anak. Ketika itu baru 9 anak yang menghadiri upacara pembukaan, akan tetapi tepat ketika Pak Harfan, sang kepala sekolah, hendak berpidato menutup sekolah, Harun dan ibunya datang untuk mendaftarkan diri di sekolah kecil itu. "),
	)
	book_list.push(new Book("Buku Besar Peminum Kopi", "Andrea Hirata",
		"https://cdn.gramedia.com/uploads/items/img211.jpg",
		"Sabari memiliki 3 sahabat yaitu Ukun, Tamat, dan Toharun yang selalu bersama dengan kekonyolannya. Sabari awalnya tidak tertarik dengan yang namanya cinta, tetapi setelah Marlena memberikan sebuah pensil sebagai hadiah karena Marlena mengambil kertas jawabannya, sejak itu Sabari berubah 180° dari biasanya."),
	)
	book_list.push(new Book("Sang Pemimpi", "Andrea Hirata",
		"https://upload.wikimedia.org/wikipedia/id/thumb/8/89/Sang_Pemimpi_sampul.jpg/220px-Sang_Pemimpi_sampul.jpg",
		"Andrea mengenali Arai yang hidup yatim piatu dan harus hidup sebatang kara (\"Simpai Keramat\"). Karena, ayahnya satu-satunya anggota keluarganya, meninggal dunia. Sedangkan, Andrea dan Arai mengenali Jimbron di Masjid Al-Hikmah. Jimbron diasuh oleh Pendeta Geovanny, keluarga dekat Jimbron yang berbeda agama, karena Jimbron juga anak yatim piatu, sama seperti Arai. Gaya berbicara Jimbron agak sedikit gagap, dan Jimbron terobsesi pada kuda, karena gemar menonton serial televisi \"The Lone Ranger\". Dari serial televisi tersebut, Jimbron mengagung-agungkan kuda sebagai hewan yang memenangkan perang Badar. "),
	)
	book_list.push(new Book("My Immortal", "Tara Gillesbie",
		"https://m.media-amazon.com/images/I/41E2ea3d1iL.jpg",
		"My Immortal is the most famous, notoriously bad fan fiction ever written. Based very loosely in the Harry Potter universe and featuring the blatant Mary-Sue protagonist Ebony (or often times \"Enoby\"), it reads like a detailed list of everything a fanfic author could ever possibly do wrong, only taken to exaggerated, horrifying extremes. My Immortal was originally posted to FanFiction.Net sometime in 2006, but was subsequently deleted by the FF.Net staff after causing a severe drop in the site's collective IQ. In fact, the fanfic is so unbelievably bad that many refuse to accept that it's real, insisting that the author was only trolling and that the story is really a parody. Regardless of the author's intent, My Immortal remains one of the most cringe-worthy, unintentionally hilarious, so-bad-it's-good pieces of literature the internet has ever produced."),
	)
	book_list.push(new Book("Harry Potter and The Philosopher Stone", "J.K. Rowling",
		"https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale/jackets/9781408855652.jpg",
		"I don't know, Man"),
	)
	book_list.push(new Book("Empress Theresa", "Norman Boutin",
		"https://static.wikia.nocookie.net/empress-theresa/images/4/49/ET-2018-upload.jpg/revision/latest/scale-to-width-down/1000?cb=20191216004640",
		"I don't know, Man"),
	)
	book_list.push(new Book("Ayah", "Andrea Hirata",
		"https://upload.wikimedia.org/wikipedia/id/thumb/f/f3/Ayah_%28novel%29.jpeg/220px-Ayah_%28novel%29.jpeg",
		"Sabari memiliki 3 sahabat yaitu Ukun, Tamat, dan Toharun yang selalu bersama dengan kekonyolannya. Sabari awalnya tidak tertarik dengan yang namanya cinta, tetapi setelah Marlena memberikan sebuah pensil sebagai hadiah karena Marlena mengambil kertas jawabannya, sejak itu Sabari berubah 180° dari biasanya."),
	)
	book_list.push(new Book("Laskar Pelangi", "Andrea Hirata",
		"https://upload.wikimedia.org/wikipedia/id/thumb/8/8e/Laskar_pelangi_sampul.jpg/220px-Laskar_pelangi_sampul.jpg",
		"Cerita terjadi di desa Gantung, Belitung Timur. Dimulai ketika sekolah Muhammadiyah terancam akan dibubarkan oleh Depdikbud Sumsel jikalau tidak mencapai siswa baru sejumlah 10 anak. Ketika itu baru 9 anak yang menghadiri upacara pembukaan, akan tetapi tepat ketika Pak Harfan, sang kepala sekolah, hendak berpidato menutup sekolah, Harun dan ibunya datang untuk mendaftarkan diri di sekolah kecil itu. "),
	)
	book_list.push(new Book("Buku Besar Peminum Kopi", "Andrea Hirata",
		"https://cdn.gramedia.com/uploads/items/img211.jpg",
		"Sabari memiliki 3 sahabat yaitu Ukun, Tamat, dan Toharun yang selalu bersama dengan kekonyolannya. Sabari awalnya tidak tertarik dengan yang namanya cinta, tetapi setelah Marlena memberikan sebuah pensil sebagai hadiah karena Marlena mengambil kertas jawabannya, sejak itu Sabari berubah 180° dari biasanya."),
	)
	book_list.push(new Book("Sang Pemimpi", "Andrea Hirata",
		"https://upload.wikimedia.org/wikipedia/id/thumb/8/89/Sang_Pemimpi_sampul.jpg/220px-Sang_Pemimpi_sampul.jpg",
		"Andrea mengenali Arai yang hidup yatim piatu dan harus hidup sebatang kara (\"Simpai Keramat\"). Karena, ayahnya satu-satunya anggota keluarganya, meninggal dunia. Sedangkan, Andrea dan Arai mengenali Jimbron di Masjid Al-Hikmah. Jimbron diasuh oleh Pendeta Geovanny, keluarga dekat Jimbron yang berbeda agama, karena Jimbron juga anak yatim piatu, sama seperti Arai. Gaya berbicara Jimbron agak sedikit gagap, dan Jimbron terobsesi pada kuda, karena gemar menonton serial televisi \"The Lone Ranger\". Dari serial televisi tersebut, Jimbron mengagung-agungkan kuda sebagai hewan yang memenangkan perang Badar. "),
	)
	book_list.push(new Book("My Immortal", "Tara Gillesbie",
		"https://m.media-amazon.com/images/I/41E2ea3d1iL.jpg",
		"My Immortal is the most famous, notoriously bad fan fiction ever written. Based very loosely in the Harry Potter universe and featuring the blatant Mary-Sue protagonist Ebony (or often times \"Enoby\"), it reads like a detailed list of everything a fanfic author could ever possibly do wrong, only taken to exaggerated, horrifying extremes. My Immortal was originally posted to FanFiction.Net sometime in 2006, but was subsequently deleted by the FF.Net staff after causing a severe drop in the site's collective IQ. In fact, the fanfic is so unbelievably bad that many refuse to accept that it's real, insisting that the author was only trolling and that the story is really a parody. Regardless of the author's intent, My Immortal remains one of the most cringe-worthy, unintentionally hilarious, so-bad-it's-good pieces of literature the internet has ever produced."),
	)
	book_list.push(new Book("Harry Potter and The Philosopher Stone", "J.K. Rowling",
		"https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale/jackets/9781408855652.jpg",
		"I don't know, Man"),
	)
}

function render_rack() {
	BOOK_RACK.textContent = '';
	let i = paginator_pos*10
	let books_added = 0;

	let cover_template = document.createElement("img")
	cover_template.classList.add("book__cover", "rack__book");
	while(books_added < 10 && i < book_list.length) {
		cover_template.setAttribute("id", `book${books_added}`);
		cover_template.src = book_list[i].cover;
		BOOK_RACK.appendChild(cover_template.cloneNode(true));

		books_added++;
		i++;
	}

	cover_template.src = "";
	cover_template.classList.add("book--no-cover");
	while(books_added < 10) {
		cover_template.setAttribute("id", `book${books_added}`);
		BOOK_RACK.appendChild(cover_template.cloneNode(true));
		books_added++;
	}
}

function handle_new_book() {
	let entries = GetById("new-book__entries").children;
	book_list.push(new Book(
		entries[0].children[1].value, 
		entries[1].children[1].value, 
		entries[2].children[1].value, 
		entries[3].children[1].value)
	)
	if(book_list.length <= (paginator_pos + 1)*10) { render_rack(); }
}

function handle_paginator(step) {
	if(paginator_pos != 0 && step == -1) {
		paginator_pos--;
		render_rack();
	} else if((paginator_pos + 1)*10 < book_list.length && step == 1){
		paginator_pos++;
		render_rack();
	}
}

function handle_view_book() {
}

function remove_book() {
}

function main() {
	initialize_site();
	preload_books();
	render_rack();
}

main()
