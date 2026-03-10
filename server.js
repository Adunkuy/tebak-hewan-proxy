// server.js - Tebak Fauna - Database SUPER LENGKAP v5
// + Nama Biologis/Ilmiah (binomial nomenklatur)
// Sumber: Wikipedia ID, CNN Indonesia, Gramedia, KapanLagi, IUCN, LIPI
const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const ROBLOX_SECRET = process.env.ROBLOX_SECRET || "ganti_secret_ini";

const hewanDatabase = {
	A: [
		// Darat
		"anjing","ayam","angsa","alpaka","armadilo","armadillo","anoa",
		"alap-alap","ayam hutan","ayam kampung","ayam kate","ayam guinea",
		"ayam mutiara","ayam kalkun","ajag","antelop","antilop","aphid",
		"anai-anai","anjing laut","anjing hutan","anoa pegunungan","anoa dataran rendah",
		// Air
		"arwana","aligator","arapaima","abalone","arwana asia","arwana merah",
		"ikan ayam-ayam","anguila",
		// Udara
		"albatros","alap alap","adjutant",
		// Nama Biologis/Ilmiah
		"alligator sp","anas platyrhynchos","apis indica","apis mellifera",
		"anura","araneae",
		// Prasejarah
		"allosaurus","ankylosaurus","apatosaurus","archaeopteryx","argentavis",
		"andrewsarchus","ambulocetus","arsinoitherium","acrocanthosaurus",
		"albertosaurus","abelisaurus","amargasaurus","anchiceratops",
	],
	B: [
		// Darat
		"beruang","babi","badak","bison","biawak","bekantan","bunglon",
		"binturong","beruang madu","banteng","bajing","bengkarung",
		"beruang hitam","beruang kutub","beruang polar","babi hutan","babi rusa",
		"beruk","biri-biri","bekicot","belalang","babi celeng","babi kutil",
		"babi berjenggot","babi sulawesi","badak jawa","badak sumatra",
		"bajing tanah","bajing terbang","bokoi",
		// Air
		"buaya","bebek","berang-berang","belut","bawal","belida",
		"buaya muara","buaya air tawar","belibis","bulus","buaya nil",
		"buntal","belanak","bandeng","baronang","belut sawah","betok","betutu",
		"baung","baronang angin","baronang batik","baronang kalung",
		"baronang kunyit","baronang tompel","baronang susu",
		"barakuda","bintang laut","bulu babi","belut laut","bilis",
		// Udara
		"bangau","burung","beo","betet","bubut","bulbul","burung beo",
		"burung cendrawasih","burung elang","burung gagak","burung gereja",
		"burung hantu","burung jalak","burung kakatua","burung kolibri",
		"burung merak","burung merpati","burung nuri","burung perkutut",
		"burung pipit","burung rajawali","burung rangkong","burung sriti",
		"burung tekukur","burung wallet","blekok","blekok sawah","berkik",
		"bambangan","bangau tongtong","barau-barau","bayan","belatuk",
		"berek-berek","burung madu","burung perenjak","burung kacamata",
		"burung cabai",
		// Nama Biologis
		"bos javanicus","bos taurus","bubalus bubalis","bos sondaicus",
		"buceros rhinoceros",
		// Prasejarah
		"brachiosaurus","brontosaurus","basilosaurus","brontotherium","baryonyx",
	],
	C: [
		// Darat
		"caracal","cerpelai","celeng","cacing","cheetah","celurut",
		"coati","cipan",
		// Air
		"cumi","cumi-cumi","cupang","codot","cakalang","cucut","coelacanth",
		"cucut ronggeng","cucut tokek",
		// Udara
		"capung","cendrawasih","camar","cicak","cikalang","cikrak","cikukua",
		"cendrawasih kuning besar","cucak rawa","cucak ijo","ciblek","cinenen",
		"celepuk","cerek","cica",
		// Nama Biologis
		"canis familiaris","canis lupus","canis aureus","cervidae",
		"cetacea","chamaeleonidae","columba livia","crocodylus porosus",
		"crocodylidae","cephalopachus bancanus",
		// Prasejarah
		"ceratosaurus","coelophysis","carnotaurus","carcharodontosaurus",
		"camptosaurus","corythosaurus","chasmosaurus",
	],
	D: [
		// Darat
		"domba","dinosaurus","dingo","dromedari","dorcas","dingiso",
		// Air
		"delfin","dugong","duyung","duyung laut",
		// Udara
		"dara","derkuku","dodo","drongo","delimukan",
		// Nama Biologis
		"delphinidae","dendrolagus goodfellowi","dicerorhinus sumatrensis",
		"dugong dugon",
		// Prasejarah
		"diplodocus","dimetrodon","deinosuchus","deinotherium","diprotodon",
		"dilophosaurus","doedicurus","daspletosaurus",
	],
	E: [
		// Darat
		"echidna",
		// Air
		"ekor kuning","electrophorus electricus",
		// Udara
		"elang","emu","elang laut","elang jawa","elang bondol","elang brontok",
		"elang flores","elang gunung","elang hitam","elang ikan","elang wallace",
		"elang kepala putih","elang laut perut putih","elang sikap","enggang",
		"entok","elang tiram",
		// Nama Biologis
		"elephas maximus","equus caballus","equus zebra","equus ferus caballus",
		"erinaceinae",
		// Prasejarah
		"edmontosaurus","elasmotherium","entelodon","elasmosaurus","eoraptor",
		"euoplocephalus","eohippus","edmontonia",
	],
	F: [
		// Darat
		"ferret","fenek","fossa",
		// Air
		"frogfish",
		// Udara
		"flamingo","falcon","fregata","fulmar",
		// Nama Biologis
		"felis catus","felis silvestris catus",
		// Prasejarah
		"fasolasuchus",
	],
	G: [
		// Darat
		"gajah","gorila","gibbon","gecko","gaur","gerbil","gerboa","gnu",
		"gajah asia","gajah afrika","gajah borneo","gajah india","gajah kerdil",
		"garangan","gazelle","gibon","gorila gunung","gorila dataran rendah",
		"garangan jawa","garangan berkerah",
		// Air
		"gajah laut","goby","guppy","gurita","gabus","gurami","gurame","garing",
		// Udara
		"gelatik","gagak","garuda","gemak","gosong","golik",
		"gelatik jawa","gelatik batu",
		// Nama Biologis
		"gallus gallus domesticus","giraffa camelopardalis","gorilla gorilla",
		"gorilla beringei",
		// Prasejarah
		"gigantopithecus","giganotosaurus","glyptodon","gastornis","gorgonops",
	],
	H: [
		// Darat
		"harimau","hamster","hyena","hipopotamus","hedgehog",
		"harimau benggala","harimau jawa","harimau malaya","harimau siberia",
		"harimau sumatra","harimau sumatera","harimau bali","hamster emas",
		"hamster kerdil","hyena belang","hyena cokelat","hyena tutul",
		// Air
		"hiu","hiu banteng","hiu biru","hiu goblin","hiu kepala martil",
		"hiu paus","hiu putih","hiu todak","hiu zebra","hiu harimau",
		"hiu martil","hiu karang","hiu lemon","hiu macan","hiu perawat","hilsa",
		// Udara
		"helang","heron","hudhud",
		// Nama Biologis
		"hippopotamus amphibius","hylochoerus meinertzhageni",
		// Prasejarah
		"hadrosaur","herrerasaurus","helicoprion","hypsilophodon",
	],
	I: [
		// Darat
		"iguana","impala",
		// Air
		"ikan","ikan mas","ikan lele","ikan nila","ikan koi","ikan arwana",
		"ikan bandeng","ikan bawal","ikan belida","ikan buntal","ikan gabus",
		"ikan guppy","ikan kakap","ikan kembung","ikan louhan","ikan mujair",
		"ikan patin","ikan piranha","ikan salmon","ikan sardin","ikan tenggiri",
		"ikan tongkol","ikan tuna","ikan hias","ikan cupang","ikan gurame",
		"ikan kerapu","ikan kuwe","ikan layang","ikan pari","ikan pelangi",
		"ikan selar","ikan sidat","ikan tembakul","ikan cakalang","ikan layur",
		"ikan barakuda","ikan todak","ikan belanak","ikan sepat","ikan teri",
		"ikan kakap merah","ikan kakap putih","ikan kerapu bebek","ikan kerapu harimau",
		"ikan kembung lelaki","ikan kembung perempuan","ikan terbang","ikan kodok",
		"ikan injel","ikan giru","ikan lemadang","ikan makerel","ikan manyung",
		"ikan lepu","ikan lepu ayam","ikan discus","ikan neon tetra","ikan swordtail",
		"ikan molly","ikan oscar","ikan mas koki","ikan sumatra","ikan pelangi merah",
		"ikan pelangi boesemani","ikan haring","ikan julung-julung","ikan kakatua",
		"ikan dokter","ikan bendera","ikan regal",
		// Udara
		"itik","ibis",
		// Nama Biologis
		"istiophorus platypterus",
		// Prasejarah
		"iguanodon","ichthyosaurus","ichthyostega",
	],
	J: [
		// Darat
		"jerapah","jaguar","jangkrik",
		// Air
		"jellyfish","ubur-ubur","julung-julung","jelawat",
		// Udara
		"jalak","jalak bali","jalak suren","julang","julang emas",
		// Nama Biologis
		"jangkrik",
		// Prasejarah
		"janenschia",
	],
	K: [
		// Darat
		"kambing","kuda","kelinci","koala","kanguru","kelelawar","kadal",
		"kerbau","kakaktua","komodo","kucing","kumbang","kalkun","kalajengking",
		"kera","kukang","kakatua","kambing gunung","kambing hutan","kanguru pohon",
		"kanguru merah","kanguru abu-abu","kelelawar buah","kelelawar vampir",
		"keledai","kijang","kancil","kijang ekor putih","kijang muntjak",
		"kukang jawa","kukang kalimantan","kukang sumatra","kerbau air",
		"kecoa","kecoak","kelabang","kaki seribu","kampret","kapibara",
		"kuskus","kucing hutan","kucing liar","kucing serval","kucing pasir",
		"kuda poni","kuskus gebe","kuskus gunung","kuskus tanah","kuskus mata-biru",
		"kuskus kelabu","kuskus coklat","kuskus maluku","kuskus tutul",
		"kubung","kubung sunda","krabuku","kilyo","kempelon",
		// Air
		"kepiting","keong","kerang","katak","kura-kura","kuda laut","kuda nil",
		"kepiting bakau","kepiting kenari","kerang hijau","katak pohon",
		"katak lembu","katak sawah","kodok","kerapu","kakap","kepiting rajungan",
		"kerang darah","kerang simping","koi","kelabau","kancra","kapar","keting",
		// Udara
		"kasuari","kolibri","kutilang","kangkareng","kapinis","kareo","kasturi",
		"kacer","kenari","kuntul","kancilan",
		// Nama Biologis
		"koala phascolarctos cinereus",
		// Prasejarah
		"kentrosaurus","kronosaurus","kelenken","kritosaurus",
	],
	L: [
		// Darat
		"lemur","landak","lynx","laba-laba","lalat","luwak","lingsang",
		"landak pohon","langur","lemur ekor cincin","lemur kerdil","leopard",
		"lutung","lutung jawa","lutung perak","laron","lipan","lintah","lipas",
		"lutung hitam","lutung merah","lutung kokah","lutung mentawai",
		"lutung siberut","lutung sarawak",
		// Air
		"lele","lumba-lumba","landak laut","lele dumbo","lionfish","louhan",
		"lobster","layur","lemadang","lais","limbat","lundu","lele jawa",
		// Udara
		"lebah","lebah madu","layang-layang",
		// Nama Biologis
		"lacertilia","lepidoptera","loligo pealii",
		// Prasejarah
		"liopleurodon","lesothosaurus",
	],
	M: [
		// Darat
		"macan","monyet","musang","menjangan","marmot","marmut","maleo",
		"macan tutul","macan dahan","macan kumbang","macan tutul jawa",
		"macan tutul salju","maleo sulawesi","malu-malu","mandrill","marmoset",
		"monyet bekantan","monyet ekor panjang","monyet proboscis",
		"monyet rhesus","mongoose","musang luwak","musang pandan","mambruk",
		"monyet kera","monyet hada","monyet gorontalo","monyet digo",
		// Air
		"manta","pari manta","mujair","maskoki","makerel",
		// Udara
		"merpati","merak","mentok","merak biru","merak hijau","merak putih",
		"merak jawa","murai","murai batu","mandar","manyar",
		// Nama Biologis
		"macaca fascicularis","manis javanica","mantis religiosa",
		"mabouya multifasciata","macropodidae","muntiacini",
		// Prasejarah
		"mammoth","megalosaurus","mosasaurus","megalodon","mastodon",
		"megatherium","macrauchenia","maiasaura","megalania",
	],
	N: [
		// Darat
		"nilgai","naga","nokdiak",
		// Air
		"narwhal","nautilus","nila","nilem",
		// Udara
		"nuri","nuri kepala hitam","nuri merah","nuri pelangi","nuri raja ambon",
		"ngengat","nyamuk","nazar",
		// Nama Biologis
		"nasalis larvatus","nycticebus coucang","nycticebus javanicus",
		"nycticebus bancanus","nycticebus borneanus",
		// Prasejarah
		"nothosaurus","nigersaurus",
	],
	O: [
		// Darat
		"orangutan","onta","ocelot","okapi","opossum","oryx",
		"orangutan borneo","orangutan kalimantan","orangutan sumatra",
		// Air
		"orca","octopus",
		// Udara
		"owa",
		// Nama Biologis
		"ornithorhynchus anatinus","oryctolagus cuniculus","otariidae",
		// Prasejarah
		"oviraptor","ornithomimus","ouranosaurus",
	],
	P: [
		// Darat
		"panda","panther","platipus","platypus","pelanduk","porcupine",
		"panda merah","panda raksasa","pika","piton","python",
		// Air
		"paus","penyu","pari","piranha","paus biru","paus bungkuk",
		"paus gigi","paus pembunuh","paus sperma","pari manta","pari listrik",
		"penyu belimbing","penyu hijau","penyu lekang","penyu sisik",
		"patin","pesut","pesut mahakam",
		// Udara
		"pinguin","pelikan","puyuh","pelatuk","pipit","parkit",
		"pelikan merah muda","perkutut","pipit benggala","pecuk","pergam",
		// Nama Biologis
		"panthera leo","panthera tigris","panthera tigris sumatrae",
		"panthera tigris tigris","panthera pardus","panthera onca",
		"phascolarctos cinereus","periplaneta americana","pongo pygmaeus",
		"pongo abelii","portunus sexdentatus",
		// Prasejarah
		"pachycephalosaurus","parasaurolophus","pterodaktil","pteranodon",
		"pterosaur","plesiosaur","plesiosaurus","paraceratherium","pakicetus",
		"pentaceratops","protoceratops","plateosaurus",
	],
	Q: [
		// Darat
		"quokka","quoll",
		// Air
		"quahog",
		// Udara
		"quelea","quetzal",
		// Prasejarah
		"quetzalcoatlus",
	],
	R: [
		// Darat
		"rusa","rakun","rubah","rayap","ratel","rusa timor","rusa bawean",
		"rusa sambar","rusa totol","rubah merah","rubah fennec","reindeer",
		// Air
		"remora","rajungan",
		// Udara
		"rajawali","rangkong","rajawali emas","raja udang","rajawali papua",
		// Nama Biologis
		"rana sp","rhinoceros sondaicus","rhinoceros unicornis",
		// Prasejarah
		"raptor","rajasaurus",
	],
	S: [
		// Darat
		"singa","sapi","serigala","salamander","simpanse","sigung","surili",
		"sapi bali","sapi brahman","sapi perah","serigala abu-abu","siamang",
		"singa afrika","singa asia","sloth","surili jawa","surili sumatra",
		"setan tasmania","simakobu","simpai","sapi limousin",
		// Air
		"siput","singa laut","siput laut","siput darat","singa laut california",
		"salmon","sardine","sotong","sepia","sidat","sarden","sepat","senangin",
		"selar","selar kuning","selar bentong","setuhuk","sardinella",
		// Udara
		"sunbird","sikep madu","serindit","sikep",
		// Nama Biologis
		"sus scrofa domesticus","serpentes","selachimorpha","spheniscidae",
		"strigiformes","sciuridae",
		// Prasejarah
		"spinosaurus","stegosaurus","smilodon","sarcosuchus","styracosaurus",
		"shonisaurus","sauropelta","supersaurus",
	],
	T: [
		// Darat
		"tikus","trenggiling","tapir","tokek","tawon","tupai","tarsius",
		"tikus got","tikus hutan","tikus mondok","tikus pohon","tapir asia",
		"tapir malaya","tarsius kecil","tarsius spektrum","tarsius sulawesi",
		"trenggiling jawa","trenggiling sunda","tuatara","tupai kekes",
		"tupai tanah","tarantula","terwelu","tomcat","tangkasi",
		"tupai mentawai","tupai garis","tupai akar","tupai ramping",
		"tupai merah","tupai tercat",
		// Air
		"tuna","trout","tuntong","tembakul","teripang","tiram","todak",
		"tongkol","tongkol abu-abu","tongkol como","tongkol krai",
		"tenggiri","tenggiri melayu","tenggiri papan","teri","terubuk","tawes",
		"tengadak","tambra",
		// Udara
		"tekukur","tukan","termite",
		// Nama Biologis
		"testudines","tragulidae","tarsius sp","tachyglossidae",
		// Prasejarah
		"tyrannosaurus","triceratops","tanystropheus","therizinosaurus",
		"torvosaurus","titanoboa","toxodon","tarbosaurus","tsintaosaurus",
	],
	U: [
		// Darat
		"ular","ulat","unta","ular cobra","ular hijau","ular kobra",
		"ular piton","ular pohon","ular python","ular sanca","ular sawah",
		"ular terbang","ular viper","ular welang","ulat bulu","ulat daun",
		"ulat sutera","ungko","ular derik","ular sanca batik","ular sanca kembang",
		// Air
		"ubur-ubur","udang","udang laut","udang air tawar","udang galah",
		"udang vannamei","udang windu",
		// Udara
		"unggas",
		// Prasejarah
		"uintatherium",
	],
	V: [
		// Darat
		"viper",
		// Nama Biologis
		"varanus komodoensis","varanus salvator","viverridae",
		// Prasejarah
		"velociraptor",
	],
	W: [
		// Darat
		"walabi","wolverine","wombat","warthog","wupih",
		// Air
		"walrus",
		// Prasejarah
		"woolly mammoth","woolly rhinoceros",
	],
	X: [
		"xerus","xenops",
	],
	Y: [
		"yak","yaki",
	],
	Z: [
		// Darat
		"zebra","zorilla","zebu","zokor",
		// Nama Biologis
		"zalophus californianus",
		// Prasejarah
		"zuniceratops",
	],
};

function normalize(text) {
	return text.toLowerCase().trim().replace(/\s+/g, " ");
}

// Levenshtein distance untuk toleransi typo
function levenshtein(a, b) {
	const m = a.length, n = b.length;
	const dp = Array.from({ length: m + 1 }, (_, i) =>
		Array.from({ length: n + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0)
	);
	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (a[i-1] === b[j-1]) dp[i][j] = dp[i-1][j-1];
			else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
		}
	}
	return dp[m][n];
}

// Toleransi typo berdasarkan panjang kata
function maxTypo(len) {
	if (len <= 4) return 0; // kata pendek: harus tepat
	if (len <= 7) return 1; // kata sedang: 1 typo ok
	return 2;               // kata panjang: 2 typo ok
}

function isValidHewan(letter, answer) {
	const key = letter.toUpperCase();
	const list = hewanDatabase[key];
	if (!list) return false;

	const answerNorm = normalize(answer);
	if (answerNorm[0] !== letter.toLowerCase()) return false;

	for (const hewan of list) {
		const hewanNorm = normalize(hewan);
		// Cocok persis
		if (hewanNorm === answerNorm) return true;
		// Fuzzy matching: toleransi typo
		const allowed = maxTypo(hewanNorm.length);
		if (allowed > 0 && levenshtein(hewanNorm, answerNorm) <= allowed) return true;
	}
	return false;
}

app.post("/validate-animal", (req, res) => {
	const { secret, letter, answer } = req.body;
	if (secret !== ROBLOX_SECRET) {
		return res.status(403).json({ valid: false, reason: "Unauthorized" });
	}
	if (!letter || !answer) {
		return res.status(400).json({ valid: false, reason: "Missing parameters" });
	}
	const valid = isValidHewan(letter, answer);
	console.log(`Huruf: ${letter.toUpperCase()} | Jawaban: ${answer} | Valid: ${valid}`);
	return res.json({ valid });
});

app.get("/", (req, res) => {
	res.json({ status: "ok", message: "Tebak Fauna Proxy - Database Super Lengkap v5 + Nama Biologis!" });
});

app.listen(PORT, () => {
	console.log(`Server berjalan di port ${PORT}`);
});
