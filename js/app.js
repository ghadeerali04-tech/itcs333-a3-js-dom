// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
(function () {
    'use strict';

    const form = document.getElementById('todo-form');
    const input =document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const errorMsg=document.getElementById('error-msg');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        const text = input.value;
        if (text===''){
            errorMsg.classList.remove('hidden');
            return;
        }
        errorMsg.classList.add('hidden');

        const li=document.createElement('li');

        li.textContent=text;
        todoList.appendChild(li);

        input.value='';

    });

    todoList.addEventListener('click',(e)=>{
        const li=e.target.closest('li');
        if(!li)return;

        li.classList.toggle('completed');
    });
}) ();