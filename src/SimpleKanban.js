// Tag delete confirmation modal logic
    let tagToDelete = null;
    let tagDeleteModal = document.getElementById('tag-delete-modal');
    let tagDeleteNameSpan = null;
    let tagDeleteConfirmBtn = null;
    let tagDeleteCancelBtn = null;
    function ensureTagDeleteModal() {
        tagDeleteModal = document.getElementById('tag-delete-modal');
        if (!tagDeleteModal) {
            tagDeleteModal = document.createElement('div');
            tagDeleteModal.id = 'tag-delete-modal';
            tagDeleteModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden';
            tagDeleteModal.innerHTML = `
                <div class="bg-white rounded-lg p-6 w-11/12 max-w-sm text-center">
                    <h3 class="text-lg font-bold mb-4">Delete Tag</h3>
                    <p class="text-gray-600 mb-2">Are you sure you want to delete the tag <span id="tag-delete-name" class="font-bold"></span>? This will remove the tag from all tasks.</p>
                    <div class="mt-6 flex justify-center space-x-4">
                        <button id="cancel-tag-delete" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 w-24">Cancel</button>
                        <button id="confirm-tag-delete" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-24">Delete</button>
                    </div>
                </div>
            `;
            document.body.appendChild(tagDeleteModal);
        }
        tagDeleteNameSpan = tagDeleteModal.querySelector('#tag-delete-name');
        tagDeleteConfirmBtn = tagDeleteModal.querySelector('#confirm-tag-delete');
        tagDeleteCancelBtn = tagDeleteModal.querySelector('#cancel-tag-delete');
    }
    ensureTagDeleteModal();
    function showTagDeleteModal(tagName) {
        tagToDelete = tagName;
        ensureTagDeleteModal();
        tagDeleteNameSpan.textContent = tagName;
        tagDeleteModal.classList.remove('hidden');
        tagDeleteCancelBtn.onclick = hideTagDeleteModal;
        tagDeleteConfirmBtn.onclick = function() {
            if (tagToDelete) {
                // Remove tag from global tags
                delete tags[tagToDelete];
                // Remove tag from all tasks
                document.querySelectorAll('.task').forEach(task => {
                    if (task.dataset.tagName === tagToDelete) {
                        delete task.dataset.tagName;
                        delete task.dataset.tagColor;
                        const tagCircle = task.querySelector('.tag-circle');
                        if (tagCircle) {
                            tagCircle.style.backgroundColor = 'transparent';
                            tagCircle.classList.add('border-2', 'border-gray-400');
                        }
                        const tooltipOverlay = task.querySelector('.task-tooltip-overlay');
                        if (tooltipOverlay) {
                            tooltipOverlay.textContent = '';
                        }
                    }
                });
                openTagModal();
                hideTagDeleteModal();
            }
        };
    }
    function hideTagDeleteModal() {
        tagDeleteModal.classList.add('hidden');
        tagToDelete = null;
    }
document.addEventListener('DOMContentLoaded', () => {
    let draggedTask = null;
    let targetColumn = null;
    let taskToDelete = null;
    let currentTaskForTagging = null;

    // Global tags object
    let tags = {
        // Example: "UI/UX": "#3b82f6",
    };

    // Tag delete confirmation modal logic (move inside DOMContentLoaded for correct tags reference)
    let tagToDelete = null;
    let tagDeleteModal = document.getElementById('tag-delete-modal');
    let tagDeleteNameSpan = null;
    let tagDeleteConfirmBtn = null;
    let tagDeleteCancelBtn = null;
    function ensureTagDeleteModal() {
        tagDeleteModal = document.getElementById('tag-delete-modal');
        if (!tagDeleteModal) {
            tagDeleteModal = document.createElement('div');
            tagDeleteModal.id = 'tag-delete-modal';
            tagDeleteModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden';
            tagDeleteModal.innerHTML = `
                <div class="bg-white rounded-lg p-6 w-11/12 max-w-sm text-center">
                    <h3 class="text-lg font-bold mb-4">Delete Tag</h3>
                    <p class="text-gray-600 mb-2">Are you sure you want to delete the tag <span id="tag-delete-name" class="font-bold"></span>? This will remove the tag from all tasks.</p>
                    <div class="mt-6 flex justify-center space-x-4">
                        <button id="cancel-tag-delete" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 w-24">Cancel</button>
                        <button id="confirm-tag-delete" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-24">Delete</button>
                    </div>
                </div>
            `;
            document.body.appendChild(tagDeleteModal);
        }
        tagDeleteNameSpan = tagDeleteModal.querySelector('#tag-delete-name');
        tagDeleteConfirmBtn = tagDeleteModal.querySelector('#confirm-tag-delete');
        tagDeleteCancelBtn = tagDeleteModal.querySelector('#cancel-tag-delete');
    }
    ensureTagDeleteModal();
    function showTagDeleteModal(tagName) {
        tagToDelete = tagName;
        ensureTagDeleteModal();
        tagDeleteNameSpan.textContent = tagName;
        tagDeleteModal.classList.remove('hidden');
        tagDeleteCancelBtn.onclick = hideTagDeleteModal;
        tagDeleteConfirmBtn.onclick = function() {
            if (tagToDelete) {
                // Remove tag from global tags
                delete tags[tagToDelete];
                // Remove tag from all tasks
                document.querySelectorAll('.task').forEach(task => {
                    if (task.dataset.tagName === tagToDelete) {
                        delete task.dataset.tagName;
                        delete task.dataset.tagColor;
                        const tagCircle = task.querySelector('.tag-circle');
                        if (tagCircle) {
                            tagCircle.style.backgroundColor = 'transparent';
                            tagCircle.classList.add('border-2', 'border-gray-400');
                        }
                        const tooltipOverlay = task.querySelector('.task-tooltip-overlay');
                        if (tooltipOverlay) {
                            tooltipOverlay.textContent = '';
                        }
                    }
                });
                openTagModal();
                hideTagDeleteModal();
            }
        };
    }
    function hideTagDeleteModal() {
        tagDeleteModal.classList.add('hidden');
        tagToDelete = null;
    }

    const tagModal = document.getElementById('tag-modal');
    const cancelTagBtn = document.getElementById('cancel-tag');
    const saveTagBtn = document.getElementById('save-tag');
    const removeTagBtn = document.getElementById('remove-tag');
    const newTagNameInput = document.getElementById('new-tag-name');
    const newTagColorInput = document.getElementById('new-tag-color');
    const tagsListContainer = document.getElementById('tags-list');

    // Function to initialize event listeners for a task
    function initializeTaskEvents(task) {
        task.addEventListener('dragstart', () => {
            draggedTask = task;
            setTimeout(() => {
                task.classList.add('dragging');
            }, 0);
        });

        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
            draggedTask = null;
        });

        // Double-click to open details modal
        task.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            openTaskDetailsModal(task);
        });

        const deleteBtn = task.querySelector('.delete-task-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                taskToDelete = task;
                deleteModal.classList.remove('hidden');
            });
        }

        const tagCircle = task.querySelector('.tag-circle');
        const tooltipOverlay = task.querySelector('.task-tooltip-overlay');

        if (tagCircle && tooltipOverlay) {
            tagCircle.addEventListener('mouseenter', () => {
                if (task.dataset.tagName) {
                    tooltipOverlay.classList.remove('hidden');
                }
            });
            tagCircle.addEventListener('mouseleave', () => {
                tooltipOverlay.classList.add('hidden');
            });

            tagCircle.addEventListener('click', (e) => {
                e.stopPropagation();
                currentTaskForTagging = task;
                openTagModal();
            });
        }
    }

    // Function to open and populate the tag modal
    function openTagModal() {
        tagsListContainer.innerHTML = '';
        Object.entries(tags).forEach(([name, color]) => {
            const tagChip = document.createElement('div');
            tagChip.className = 'px-3 py-1 rounded-full text-sm font-medium cursor-pointer flex items-center gap-2';
            tagChip.style.backgroundColor = color;
            tagChip.style.color = getContrastYIQ(color);
            tagChip.textContent = name;
            tagChip.dataset.tagName = name;
            tagChip.dataset.tagColor = color;
            tagChip.addEventListener('click', () => {
                applyTagToTask(name, color);
                closeTagModal();
            });
            // Add delete button for tag
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'ml-2 text-xs text-white bg-red-600 rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-800';
            deleteBtn.innerHTML = '<span>&times;</span>';
            deleteBtn.title = 'Delete Tag';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showTagDeleteModal(name);
            });
            tagChip.appendChild(deleteBtn);
            tagsListContainer.appendChild(tagChip);
        });
        newTagNameInput.value = '';
        tagModal.classList.remove('hidden');
    }

    function closeTagModal() {
        tagModal.classList.add('hidden');
        currentTaskForTagging = null;
    }

    function applyTagToTask(name, color) {
        if (!currentTaskForTagging) return;
        const tagCircle = currentTaskForTagging.querySelector('.tag-circle');
        currentTaskForTagging.dataset.tagName = name;
        currentTaskForTagging.dataset.tagColor = color;
        tagCircle.style.backgroundColor = color;
        tagCircle.classList.remove('border-2', 'border-gray-400');
        // Add or update tooltip
        const tooltipOverlay = currentTaskForTagging.querySelector('.task-tooltip-overlay');
        if (tooltipOverlay) {
            tooltipOverlay.textContent = name;
        }
    }

    function removeTagFromTask() {
        if (!currentTaskForTagging) return;
        const tagCircle = currentTaskForTagging.querySelector('.tag-circle');
        delete currentTaskForTagging.dataset.tagName;
        delete currentTaskForTagging.dataset.tagColor;
        tagCircle.style.backgroundColor = 'transparent';
        tagCircle.classList.add('border-2', 'border-gray-400');
        const tooltipOverlay = currentTaskForTagging.querySelector('.task-tooltip-overlay');
        if (tooltipOverlay) {
            tooltipOverlay.textContent = '';
        }
    }

    saveTagBtn.addEventListener('click', () => {
        const newName = newTagNameInput.value.trim();
        const newColor = newTagColorInput.value;
        if (!newName) {
            newTagNameInput.focus();
            return; // Do not close modal if name is empty
        }
        // Add to global tags if it's new
        if (!tags[newName]) {
            tags[newName] = newColor;
        }
        applyTagToTask(newName, newColor);
        closeTagModal();
    });

    removeTagBtn.addEventListener('click', () => {
        removeTagFromTask();
        closeTagModal();
    });

    cancelTagBtn.addEventListener('click', closeTagModal);

    // Linkify function for emails and URLs
    function linkifyText(text) {
        if (!text) return '';
        // Linkify emails
        text = text.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" class="text-blue-600 hover:underline" target="_blank">$1</a>');
        // Linkify URLs
        text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="text-blue-600 hover:underline" target="_blank">$1</a>');
        text = text.replace(/(www\.[^\s]+)/g, '<a href="http://$1" class="text-blue-600 hover:underline" target="_blank">$1</a>');
        return text;
    }

    // Task Details Modal logic
    const taskDetailsModal = document.getElementById('task-details-modal');
    const closeTaskDetailsBtn = document.getElementById('close-task-details');
    const saveTaskChangesBtn = document.getElementById('save-task-changes');
    const editFieldBtns = document.querySelectorAll('.edit-field-btn');
    let currentEditingTask = null;

    function openTaskDetailsModal(task) {
        currentEditingTask = task;
        // Populate display fields with linkified data
        document.getElementById('display-description').innerHTML = linkifyText(task.querySelector('p').textContent);
        document.getElementById('display-stakeholders').innerHTML = linkifyText(task.dataset.stakeholders || '');
        document.getElementById('display-notes').innerHTML = linkifyText(task.dataset.notes || '');
        // Populate edit fields with current values
        document.getElementById('edit-description').value = task.querySelector('p').textContent;
        document.getElementById('edit-due-date').value = task.dataset.dueDate || '';
        document.getElementById('edit-started-date').value = task.dataset.startedDate || '';
        document.getElementById('edit-stakeholders').value = task.dataset.stakeholders || '';
        document.getElementById('edit-notes').value = task.dataset.notes || '';
        // Hide all edit fields initially (except dates which are always visible)
        document.querySelectorAll('[id^="edit-"]:not(#edit-due-date):not(#edit-started-date)').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('[id^="display-"]').forEach(el => el.classList.remove('hidden'));
        taskDetailsModal.classList.remove('hidden');
    }

    function closeTaskDetailsModal() {
        taskDetailsModal.classList.add('hidden');
        currentEditingTask = null;
    }

    function toggleEditMode(field) {
        const displayEl = document.getElementById(`display-${field}`);
        const editEl = document.getElementById(`edit-${field}`);
        if (editEl.classList.contains('hidden')) {
            // Switch to edit mode
            editEl.classList.remove('hidden');
            displayEl.classList.add('hidden');
            if (field === 'description') {
                editEl.value = currentEditingTask.querySelector('p').textContent;
            } else if (field === 'stakeholders') {
                editEl.value = currentEditingTask.dataset.stakeholders || '';
            } else if (field === 'notes') {
                editEl.value = currentEditingTask.dataset.notes || '';
            }
            editEl.focus();
        } else {
            // Switch back to display mode
            editEl.classList.add('hidden');
            displayEl.classList.remove('hidden');
            // Update display with the edited value
            if (field === 'description') {
                displayEl.innerHTML = linkifyText(editEl.value);
            } else if (field === 'stakeholders') {
                displayEl.innerHTML = linkifyText(editEl.value);
            } else if (field === 'notes') {
                displayEl.innerHTML = linkifyText(editEl.value);
            }
        }
    }

    function saveTaskChanges() {
        if (!currentEditingTask) return;
        // Update task data from edit fields
        const newDescription = document.getElementById('edit-description').value.trim();
        const newDueDate = document.getElementById('edit-due-date').value;
        const newStartedDate = document.getElementById('edit-started-date').value;
        const newStakeholders = document.getElementById('edit-stakeholders').value.trim();
        const newNotes = document.getElementById('edit-notes').value.trim();

        // Update task element
        currentEditingTask.querySelector('p').innerHTML = linkifyText(newDescription);
        currentEditingTask.dataset.dueDate = newDueDate;
        currentEditingTask.dataset.startedDate = newStartedDate;
        currentEditingTask.dataset.stakeholders = newStakeholders;
        currentEditingTask.dataset.notes = newNotes;

        // Update display spans on task card
        const dueDateSpan = currentEditingTask.querySelector('.due-date-display');
        if (dueDateSpan) {
            if (newDueDate) {
                const date = new Date(newDueDate);
                dueDateSpan.textContent = `Due: ${date.toLocaleDateString(undefined, { timeZone: 'UTC' })}`;
                dueDateSpan.classList.remove('hidden');
            } else {
                dueDateSpan.classList.add('hidden');
            }
        }

        const startedDateSpan = currentEditingTask.querySelector('.started-date-display');
        if (startedDateSpan) {
            if (newStartedDate) {
                const date = new Date(newStartedDate);
                startedDateSpan.textContent = `Started: ${date.toLocaleDateString(undefined, { timeZone: 'UTC' })}`;
                startedDateSpan.classList.remove('hidden');
            } else {
                startedDateSpan.classList.add('hidden');
            }
        }

        saveBoardState();
        closeTaskDetailsModal();
    }

    if (closeTaskDetailsBtn) {
        closeTaskDetailsBtn.addEventListener('click', closeTaskDetailsModal);
    }
    if (saveTaskChangesBtn) {
        saveTaskChangesBtn.addEventListener('click', saveTaskChanges);
    }
    editFieldBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const field = e.target.dataset.field;
            toggleEditMode(field);
        });
    });

    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !taskDetailsModal.classList.contains('hidden')) {
            closeTaskDetailsModal();
        }
    });

    // Function to create a new task element
    function createNewTask(text, dueDate, stakeholders, notes) {
        const task = document.createElement('div');
        task.className = 'task p-4 bg-gray-50 rounded-lg shadow cursor-grab active:cursor-grabbing relative';
        task.draggable = true;
        const p = document.createElement('p');
        p.textContent = text;
        task.appendChild(p);
        // Due Date
        const dueDateSpan = document.createElement('span');
        dueDateSpan.className = 'due-date-display text-xs text-gray-500 mt-2 block';
        if (dueDate) {
            task.dataset.dueDate = dueDate; // Store date for sorting
            const dateParts = dueDate.split('-');
            const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
            dueDateSpan.textContent = `Due: ${date.toLocaleDateString(undefined, { timeZone: 'UTC' })}`;
        } else {
            dueDateSpan.classList.add('hidden');
            dueDateSpan.textContent = 'Due: --';
        }
        task.appendChild(dueDateSpan);
        // Store stakeholders and notes in dataset
        if (stakeholders) task.dataset.stakeholders = stakeholders;
        if (notes) task.dataset.notes = notes;
        // Started Date
        const startedDateSpan = document.createElement('span');
        startedDateSpan.className = 'started-date-display text-xs text-gray-500 mt-1 block hidden';
        startedDateSpan.textContent = 'Started: --';
        task.appendChild(startedDateSpan);
        // Completed Date
        const completedDateSpan = document.createElement('span');
        completedDateSpan.className = 'completed-date-display text-xs text-gray-500 mt-1 block hidden';
        completedDateSpan.textContent = 'Completed: --';
        task.appendChild(completedDateSpan);
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-task-btn absolute top-2 right-2 text-red-500 hover:text-red-700 hidden';
        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" /></svg>`;
        task.appendChild(deleteBtn);
        const tagCircle = document.createElement('div');
        tagCircle.className = 'tag-circle absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-gray-400 cursor-pointer';
        task.appendChild(tagCircle);
        const tooltipOverlay = document.createElement('div');
        tooltipOverlay.className = 'task-tooltip-overlay absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center text-white font-bold hidden pointer-events-none';
        task.appendChild(tooltipOverlay);
        initializeTaskEvents(task);
        return task;
    }

    // Initialize existing tasks
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(initializeTaskEvents);
    // Event listeners for drop zones (task containers)
    const taskContainers = document.querySelectorAll('.tasks');
    const todayDisplayString = new Date().toLocaleDateString(undefined, { timeZone: 'UTC' });
    const todayDataString = new Date().toISOString().split('T')[0];
    taskContainers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY);
            const currentlyDragged = document.querySelector('.dragging');
            if (afterElement == null) {
                container.appendChild(currentlyDragged);
            } else {
                container.insertBefore(currentlyDragged, afterElement);
            }
        });
        container.addEventListener('drop', e => {
            e.preventDefault();
            if (!draggedTask) return;
            const columnId = container.dataset.columnId;
            const startedDateDisplay = draggedTask.querySelector('.started-date-display');
            const completedDateDisplay = draggedTask.querySelector('.completed-date-display');
            const deleteBtn = draggedTask.querySelector('.delete-task-btn');
            switch (columnId) {
                case 'inprogress':
                    // Set started date only if it's not already set
                    if (!draggedTask.dataset.startedDate) {
                        draggedTask.dataset.startedDate = todayDataString;
                        if(startedDateDisplay) {
                            startedDateDisplay.textContent = `Started: ${todayDisplayString}`;
                            startedDateDisplay.classList.remove('hidden');
                        }
                    }
                    // Clear completed date
                    draggedTask.removeAttribute('data-completed-date');
                    if(completedDateDisplay) {
                        completedDateDisplay.textContent = 'Completed: --';
                        completedDateDisplay.classList.add('hidden');
                    }
                    if (deleteBtn) deleteBtn.classList.add('hidden');
                    break;
                case 'completed':
                    // Set started date if it's not already set
                    if (!draggedTask.dataset.startedDate) {
                        draggedTask.dataset.startedDate = todayDataString;
                        if(startedDateDisplay) {
                            startedDateDisplay.textContent = `Started: ${todayDisplayString}`;
                            startedDateDisplay.classList.remove('hidden');
                        }
                    }
                    // Set completed date
                    draggedTask.dataset.completedDate = todayDataString;
                    if(completedDateDisplay) {
                        completedDateDisplay.textContent = `Completed: ${todayDisplayString}`;
                        completedDateDisplay.classList.remove('hidden');
                    }
                    if (deleteBtn) deleteBtn.classList.remove('hidden');
                    break;
                case 'todo':
                    // Clear both dates
                    draggedTask.removeAttribute('data-started-date');
                    draggedTask.removeAttribute('data-completed-date');
                    if(startedDateDisplay) {
                        startedDateDisplay.textContent = 'Started: --';
                        startedDateDisplay.classList.add('hidden');
                    }
                    if(completedDateDisplay) {
                        completedDateDisplay.textContent = 'Completed: --';
                        completedDateDisplay.classList.add('hidden');
                    }
                    if (deleteBtn) deleteBtn.classList.add('hidden');
                    break;
            }
            draggedTask.dataset.columnId = columnId; // Persist new column for this task
            saveBoardState(); // Persist after drop
        });
    });

    // Helper function to determine where to drop the element
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    // Modal functionality
    const modal = document.getElementById('task-modal');
    const addTaskButtons = document.querySelectorAll('.add-task-btn');
    const cancelTaskButton = document.getElementById('cancel-task');
    const saveTaskButton = document.getElementById('save-task');
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('task-due-date');
    const stakeholdersInput = document.getElementById('stakeholders-input');
    const notesInput = document.getElementById('notes-input');
    const deleteModal = document.getElementById('delete-modal');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    addTaskButtons.forEach(button => {
        button.addEventListener('click', () => {
            targetColumn = document.querySelector(`#${button.dataset.column} .tasks`);
            modal.classList.remove('hidden');
            taskInput.focus();
        });
    });
    function closeModal() {
        modal.classList.add('hidden');
        taskInput.value = '';
        dueDateInput.value = '';
        if (stakeholdersInput) stakeholdersInput.value = '';
        if (notesInput) notesInput.value = '';
        targetColumn = null;
    }
    cancelTaskButton.addEventListener('click', closeModal);
    saveTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const stakeholders = stakeholdersInput ? stakeholdersInput.value.trim() : '';
        const notes = notesInput ? notesInput.value.trim() : '';
        if (taskText && targetColumn) {
            const newTask = createNewTask(taskText, dueDate, stakeholders, notes);
            targetColumn.appendChild(newTask);
            saveBoardState(); // Persist new task
            closeModal();
        }
    });
    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!modal.classList.contains('hidden')) {
                closeModal();
            }
            if (!tagModal.classList.contains('hidden')) {
                closeTagModal();
            }
            if (!deleteModal.classList.contains('hidden')) {
                deleteModal.classList.add('hidden');
                taskToDelete = null;
            }
        }
    });
    // Delete modal functionality
    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.classList.add('hidden');
        taskToDelete = null;
    });
    confirmDeleteBtn.addEventListener('click', () => {
        if (taskToDelete) {
            taskToDelete.remove();
            saveBoardState(); // Ensure localStorage is updated after deletion
        }
        deleteModal.classList.add('hidden');
        taskToDelete = null;
    });
    // Sort functionality
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const columnId = button.dataset.columnId;
            const column = document.getElementById(columnId);
            const taskContainer = column.querySelector('.tasks');
            const tasks = Array.from(taskContainer.querySelectorAll('.task'));
            tasks.sort((a, b) => {
                const dateA = a.dataset.dueDate ? new Date(a.dataset.dueDate) : null;
                const dateB = b.dataset.dueDate ? new Date(b.dataset.dueDate) : null;
                if (dateA && dateB) {
                    return dateA - dateB; // Sort by date ascending
                }
                if (dateA) {
                    return -1; // A has a date, B doesn't, so A comes first
                }
                if (dateB) {
                    return 1; // B has a date, A doesn't, so B comes first
                }
                return 0; // Both have no date, keep original order
            });
            // Re-append tasks in sorted order
            tasks.forEach(task => taskContainer.appendChild(task));
        });
    });
    // Helper to determine text color based on background
    function getContrastYIQ(hexcolor){
        hexcolor = hexcolor.replace("#", "");
        var r = parseInt(hexcolor.substr(0,2),16);
        var g = parseInt(hexcolor.substr(2,2),16);
        var b = parseInt(hexcolor.substr(4,2),16);
        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    // Tag filter dropdown logic
    const tagFilter = document.getElementById('tag-filter');
    const tasksContainers = document.querySelectorAll('.tasks');
    function getAllTags() {
        const tags = new Set();
        document.querySelectorAll('.task').forEach(task => {
            if (task.dataset.tagName) {
                tags.add(task.dataset.tagName);
            }
        });
        return Array.from(tags);
    }
    function updateTagOptions() {
        const select = tagFilter;
        const currentValue = select.value; // Save current selection
        // Remove all except All and Unassigned
        select.querySelectorAll('option:not([value="all"]):not([value="unassigned"])').forEach(opt => opt.remove());
        getAllTags().forEach(tag => {
            if (!select.querySelector('option[value="' + tag + '"]')) {
                const opt = document.createElement('option');
                opt.value = tag;
                opt.textContent = tag;
                select.appendChild(opt);
            }
        });
        select.value = currentValue; // Restore selection
    }
    function filterTasks() {
        const value = tagFilter.value;
        document.querySelectorAll('.task').forEach(task => {
            if (value === 'all') {
                task.style.display = '';
            } else if (value === 'unassigned') {
                if (!task.dataset.tagName) {
                    task.style.display = '';
                } else {
                    task.style.display = 'none';
                }
            } else {
                if (task.dataset.tagName === value) {
                    task.style.display = '';
                } else {
                    task.style.display = 'none';
                }
            }
        });
    }
    tagFilter.addEventListener('change', filterTasks);
    // Update tag options on DOM changes
    setInterval(updateTagOptions, 1000);

    // Save board locally and remotely
    function saveBoardState() {
        const save_json = convertBoardToJSON();
        saveBoardToLocalStorage(save_json);
        saveBoardToRemoteStorage(save_json);
    }

    // Convert current board state to JSON
    function convertBoardToJSON() {
        const boardData = {
            tasks: [],
            tags: {...tags}
        };
        document.querySelectorAll('.tasks').forEach(container => {
            const columnId = container.dataset.columnId;
            Array.from(container.querySelectorAll('.task')).forEach(task => {
                boardData.tasks.push({
                    text: task.querySelector('p').textContent,
                    dueDate: task.dataset.dueDate || '',
                    startedDate: task.dataset.startedDate || '',
                    completedDate: task.dataset.completedDate || '',
                    tagName: task.dataset.tagName || '',
                    tagColor: task.dataset.tagColor || '',
                    stakeholders: task.dataset.stakeholders || '',
                    notes: task.dataset.notes || '',
                    column: columnId
                });
            });
        });
        return JSON.stringify(boardData);
    }    

    // Local Storage Persistence
    function saveBoardToLocalStorage(save_json) {
        localStorage.setItem('kanbanBoard', save_json);
    }

    // RemoteStorage Persistence
    function saveBoardToRemoteStorage(save_json) {
        // Placeholder for Post to RESTFUL endpoint, etc...
        console.log('Saving board to remote storage not yet implemented:', save_json);
    }

    // Load Board From Remote Storage
    function loadBoardFromRemoteStorage(input_json) {
        convertJSONToBoard(input_json);
    }

    // Load board state from local storage
    function loadBoardFromLocalStorage() {
        const data = localStorage.getItem('kanbanBoard');
        if (!data) return;
        convertJSONToBoard(data);
    }

    // Convert JSON back to board state
    function convertJSONToBoard(json) {
        let boardData;
        try {
            boardData = JSON.parse(json);
        } catch (e) {
            console.error('Failed to parse kanbanBoard JSON:', e);
            return;
        }
        // Clear all columns
        document.querySelectorAll('.tasks').forEach(container => container.innerHTML = '');
        // Restore tags
        Object.keys(tags).forEach(k => delete tags[k]);
        Object.assign(tags, boardData.tags);
        // Restore tasks
        boardData.tasks.forEach(taskData => {
            const task = createNewTask(taskData.text, taskData.dueDate, taskData.stakeholders, taskData.notes);
            if (taskData.startedDate) task.dataset.startedDate = taskData.startedDate;
            if (taskData.completedDate) task.dataset.completedDate = taskData.completedDate;
            if (taskData.tagName) {
                task.dataset.tagName = taskData.tagName;
                task.dataset.tagColor = taskData.tagColor;
                const tagCircle = task.querySelector('.tag-circle');
                if (tagCircle) {
                    tagCircle.style.backgroundColor = taskData.tagColor;
                    tagCircle.classList.remove('border-2', 'border-gray-400');
                }
                const tooltipOverlay = task.querySelector('.task-tooltip-overlay');
                if (tooltipOverlay) {
                    tooltipOverlay.textContent = taskData.tagName;
                }
            }
            // Set started/completed date display
            const startedDateDisplay = task.querySelector('.started-date-display');
            if (startedDateDisplay && taskData.startedDate) {
                startedDateDisplay.textContent = `Started: ${new Date(taskData.startedDate).toLocaleDateString(undefined, { timeZone: 'UTC' })}`;
                startedDateDisplay.classList.remove('hidden');
            }
            const completedDateDisplay = task.querySelector('.completed-date-display');
            if (completedDateDisplay && taskData.completedDate) {
                completedDateDisplay.textContent = `Completed: ${new Date(taskData.completedDate).toLocaleDateString(undefined, { timeZone: 'UTC' })}`;
                completedDateDisplay.classList.remove('hidden');
            }
            // Show/hide delete button
            const deleteBtn = task.querySelector('.delete-task-btn');
            if (deleteBtn) {
                if (taskData.column === 'completed') {
                    deleteBtn.classList.remove('hidden');
                } else {
                    deleteBtn.classList.add('hidden');
                }
            }
            // Append to correct column
            const column = document.querySelector(`.tasks[data-column-id="${taskData.column}"]`);
            if (column) column.appendChild(task);
        });
    }

    // Call load on startup
    loadBoardFromLocalStorage();

    // Save after every UI change
    function saveAfter(fn) {
        return function(...args) {
            const result = fn.apply(this, args);
            saveBoardState();
            return result;
        };
    }
    // Patch UI actions to save
    const originalCreateNewTask = createNewTask;
    createNewTask = function(...args) {
        const task = originalCreateNewTask.apply(this, args);
        saveBoardState();
        return task;
    };
    const originalApplyTagToTask = applyTagToTask;
    applyTagToTask = function(...args) {
        originalApplyTagToTask.apply(this, args);
        saveBoardState();
    };
    const originalRemoveTagFromTask = removeTagFromTask;
    removeTagFromTask = function(...args) {
        originalRemoveTagFromTask.apply(this, args);
        saveBoardState();
    };
    const originalOpenTagModal = openTagModal;
    openTagModal = function(...args) {
        originalOpenTagModal.apply(this, args);
        saveBoardState();
    };

    // Dark mode toggle logic
    function setupDarkModeToggle() {
        const darkToggle = document.getElementById('dark-mode-toggle');
        const dot = document.querySelector('.dot');
        const mainBody = document.getElementById('main-body');

        // Check for saved preference or system preference
        const savedMode = localStorage.getItem('darkMode');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Set initial state
        if (savedMode === 'true' || (!savedMode && systemPrefersDark)) {
            darkToggle.checked = true;
            mainBody.classList.add('dark');
            if (dot) dot.style.transform = 'translateX(16px)';
        } else {
            darkToggle.checked = false;
            mainBody.classList.remove('dark');
            if (dot) dot.style.transform = 'translateX(0)';
        }

        // Handle toggle changes
        darkToggle.addEventListener('change', function() {
            if (darkToggle.checked) {
                mainBody.classList.add('dark');
                localStorage.setItem('darkMode', 'true');
                if (dot) dot.style.transform = 'translateX(16px)';
            } else {
                mainBody.classList.remove('dark');
                localStorage.setItem('darkMode', 'false');
                if (dot) dot.style.transform = 'translateX(0)';
            }
        });

        // Listen for system preference changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('darkMode')) {
                    if (e.matches) {
                        darkToggle.checked = true;
                        mainBody.classList.add('dark');
                        if (dot) dot.style.transform = 'translateX(16px)';
                    } else {
                        darkToggle.checked = false;
                        mainBody.classList.remove('dark');
                        if (dot) dot.style.transform = 'translateX(0)';
                    }
                }
            });
        }
    }

    // Initialize dark mode
    setupDarkModeToggle();
});