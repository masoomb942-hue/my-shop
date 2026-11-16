
let PRODUCTS=[
{id:1,name:"Essential Oversized Tee",category:"T-Shirts",price:2490,old:2990,tag:"BESTSELLER",color:"Black",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",desc:"A relaxed everyday silhouette, crafted for effortless styling."},
{id:2,name:"Signature Heavyweight Tee",category:"T-Shirts",price:2790,old:0,tag:"NEW",color:"Off White",img:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85",desc:"Premium-feel staple with a clean NOVARA signature."},
{id:5,name:"Relaxed Fit Cargo",category:"Pants",price:3990,old:0,tag:"TRENDING",color:"Black",img:"https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=900&q=85",desc:"Utility-inspired relaxed fit for everyday wear."},
{id:6,name:"Classic Straight Trouser",category:"Pants",price:3690,old:0,tag:"ESSENTIAL",color:"Beige",img:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85",desc:"A versatile straight silhouette for a clean look."},
{id:7,name:"NOVARA Boxy Tee",category:"T-Shirts",price:2590,old:0,tag:"DROP 01",color:"Beige",img:"https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=85",desc:"A modern boxy shape in a versatile neutral tone."},
];
const money=n=>"Rs. "+Number(n).toLocaleString("en-PK");
const getCart=()=>JSON.parse(localStorage.getItem("novaraCart")||"[]");
const saveCart=x=>{localStorage.setItem("novaraCart",JSON.stringify(x));updateCounts()};
const getWish=()=>JSON.parse(localStorage.getItem("novaraWish")||"[]");
function updateCounts(){let c=getCart().reduce((s,x)=>s+x.qty,0);document.querySelectorAll("[data-cart-count]").forEach(e=>e.textContent=c);document.querySelectorAll("[data-wish-count]").forEach(e=>e.textContent=getWish().length)}
function addCart(id,size="M"){let c=getCart(),p=c.find(x=>x.id===id&&x.size===size);p?p.qty++:c.push({id,size,qty:1});saveCart(c);alert("Added to your bag.");}
function toggleWish(id){let w=getWish();w=w.includes(id)?w.filter(x=>x!==id):[...w,id];localStorage.setItem("novaraWish",JSON.stringify(w));updateCounts();if(document.querySelector("#productGrid"))renderProducts()}
function card(p){return `<article class="product"><span class="tag">${p.tag}</span><button class="wish" onclick="toggleWish(${p.id})">${getWish().includes(p.id)?"♥":"♡"}</button><a href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'"></a><h3>${p.name}</h3><div class="price">${money(p.price)} ${p.old?`<span class="old">${money(p.old)}</span>`:""}</div><div class="product-actions"><a class="smallbtn" href="product.html?id=${p.id}">View</a><button class="smallbtn" onclick="addCart(${p.id})">Quick add</button></div></article>`}
function renderProducts(){let el=document.querySelector("#productGrid");if(!el)return;let cat=el.dataset.category||"All",q=(document.querySelector("#searchProducts")?.value||"").toLowerCase(),sort=document.querySelector("#sortProducts")?.value||"default";let a=PRODUCTS.filter(p=>(cat==="All"||p.category===cat)&&p.name.toLowerCase().includes(q));if(sort==="low")a.sort((x,y)=>x.price-y.price);if(sort==="high")a.sort((x,y)=>y.price-x.price);if(el.dataset.wishlist==="yes")a=a.filter(p=>getWish().includes(p.id));el.innerHTML=a.length?a.map(card).join(""):'<p class="muted">No products found.</p>'}
function renderHeader(){document.querySelectorAll("[data-cart-count]").forEach(e=>e.textContent=getCart().reduce((s,x)=>s+x.qty,0));document.querySelectorAll("[data-wish-count]").forEach(e=>e.textContent=getWish().length);let b=document.querySelector(".menu-btn");b?.addEventListener("click",()=>document.querySelector(".mobile-nav")?.classList.toggle("open"))}
async function loadStoreProducts(){
  if(window.novaraSupabaseReady?.()){
    try{
      const db=window.novaraDb();
      const {data,error}=await db.from('products').select('*').eq('active',true).order('id');
      if(error) throw error;
      if(data?.length) PRODUCTS=data.map(p=>({id:p.id,name:p.name,category:p.category,price:p.price,old:p.old_price||0,tag:p.tag||'DROP 01',color:p.color||'Black',img:p.image_url,desc:p.description||'',sizes:p.sizes||['S','M','L','XL'],stock:p.stock||0}));

    }catch(err){console.error('NOVARA product loading error:',err);}
  }
  return PRODUCTS;
}
document.addEventListener("DOMContentLoaded",async()=>{await loadStoreProducts();renderHeader();renderProducts()});
