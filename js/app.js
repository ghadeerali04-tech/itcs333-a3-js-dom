// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here

document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById('todo-form');
    const input =document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const errorMsg=document.getElementById('error-msg');
    const filterAll=document.getElementById('filter-all');
    const filterActive=document.getElementById('filter-active');
    const filterDone=document.getElementById('filter-done');
    const counter=document.getElementById('counter');

    let currentFilter= 'all';

    function updateCounter(){
        const items=todoList.querySelectorAll('li');
        const activeItems= Array.from(items).filter(li => !li.classList.contains('completed'));
        const count = activeItems.length;
        if (counter){
            counter.textContent=`${count} item${count===1? '':'s'} left`;
        }
    }

    function applyFilter(){
        const items =todoList.querySelectorAll('li');
        items.forEach(li=>{
            const isCompleted = li.classList.contains('completed');
            if (currentFilter==='all'){ li.style.display='flex'; }
            else if (currentFilter==='active'){
                 li.style.display= isCompleted? 'none': 'flex'; }
            else if (currentFilter==='done'){
                li.style.display= isCompleted? 'flex': 'none';
            }
        });
    }
    const observer=new MutationObserver(()=>{
        updateCounter();
        applyFilter();
    });
    observer.observe(todoList, { childList: true, attributes: true, subtree: true });

    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        const text = input.value.trim();
        if (text===''){
            errorMsg.classList.remove('hidden');
            return;
        }
        errorMsg.classList.add('hidden');

        const li=document.createElement('li');
        const span=document.createElement('span');
        span.className='item-text';
        span.textContent=text;

        const deleteBtn=document.createElement('button');
        deleteBtn.type='button';
        deleteBtn.className='delete-btn';
        deleteBtn.textContent='Delete';

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        input.value='';
        updateCounter();
        applyFilter();

    });

    todoList.addEventListener('click',(e)=>{
        const li=e.target.closest('li');
        if(!li)return;

        if (e.target.closest('.delete-btn')){
            li.remove();
            updateCounter();
            applyFilter();
            return;
        }

        li.classList.toggle('completed');
        updateCounter();
        applyFilter();
    });

    if (filterAll){
        filterAll.addEventListener('click', ()=> {
            currentFilter= 'all';
            applyFilter();
        });
    }

    if (filterActive){
        filterActive.addEventListener('click', ()=> {
            currentFilter= 'active';
            applyFilter();
        });
    }

    if (filterDone){
        filterDone.addEventListener('click', ()=> {
            currentFilter= 'done';
            applyFilter();
        });
    }
});