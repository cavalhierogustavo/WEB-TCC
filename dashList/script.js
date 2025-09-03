// Arquivo: script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA PARA SUBMENUS DROPDOWN (SIDEBAR) ---
    const setupSubmenu = (menuId) => {
        const menuItem = document.getElementById(menuId);
        if (!menuItem) return;

        const link = menuItem.querySelector('a');
        const submenu = menuItem.querySelector('.submenu');
        
        if (link && submenu) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                menuItem.classList.toggle('active');
            });
        }
    };
    setupSubmenu('users-menu');
    setupSubmenu('content-menu');

    // --- LÓGICA GERAL PARA MODAIS ---
    const openModal = (modal) => {
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };
    const closeModal = (modal) => {
        if (modal) {
            modal.classList.add('hidden');
            if (!document.querySelector('.modal-overlay:not(.hidden)')) {
                document.body.style.overflow = 'auto';
            }
        }
    };
    
    // --- LÓGICA PARA O MODAL DE CONFIRMAÇÃO DE EXCLUSÃO ---
    const deleteModal = document.getElementById('delete-confirmation-modal');
    const deleteTriggers = document.querySelectorAll('.js-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    let rowToDelete = null;

    if (deleteModal) {
        deleteTriggers.forEach(button => {
            button.addEventListener('click', () => {
                rowToDelete = button.closest('.list-row');
                openModal(deleteModal);
            });
        });
        if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', () => { rowToDelete = null; closeModal(deleteModal); });
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', () => {
                if (rowToDelete) {
                    rowToDelete.classList.add('hidden');
                }
                closeModal(deleteModal);
                rowToDelete = null;
            });
        }
    }

    // --- (NOVO) LÓGICA PARA O MODAL DE EDIÇÃO DE USUÁRIO ---
    const editModal = document.getElementById('edit-user-modal');
    const editTriggers = document.querySelectorAll('.js-edit-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const saveEditBtn = document.getElementById('save-edit-btn');

    // Campos do formulário do modal
    const editUserName = document.getElementById('edit-user-name');
    const editUserUsername = document.getElementById('edit-user-username');
    const editUserType = document.getElementById('edit-user-type');
    const editUserStatus = document.getElementById('edit-user-status');
    
    let currentRowEditing = null;

    if (editModal) {
        // Abrir modal e preencher dados
        editTriggers.forEach(button => {
            button.addEventListener('click', () => {
                currentRowEditing = button.closest('.list-row');

                // Pega os dados da linha clicada
                const name = currentRowEditing.querySelector('.user-name').textContent;
                const username = currentRowEditing.querySelector('.user-username').textContent;
                const type = currentRowEditing.querySelector('.user-type .tag').textContent;
                const status = currentRowEditing.querySelector('.user-status .tag').textContent;

                // Preenche o formulário do modal com os dados
                editUserName.value = name;
                editUserUsername.value = username;
                editUserType.value = type;
                editUserStatus.value = status;
                
                openModal(editModal);
            });
        });

        // Ação de Salvar
        if(saveEditBtn) {
            saveEditBtn.addEventListener('click', () => {
                if (currentRowEditing) {
                    // Pega os novos valores do formulário
                    const newName = editUserName.value;
                    const newUsername = editUserUsername.value;
                    const newType = editUserType.value;
                    const newStatus = editUserStatus.value;
                    
                    // Atualiza os valores na linha original da tabela
                    currentRowEditing.querySelector('.user-name').textContent = newName;
                    currentRowEditing.querySelector('.user-username').textContent = newUsername;

                    // Atualiza a tag de Tipo
                    const typeTag = currentRowEditing.querySelector('.user-type .tag');
                    typeTag.textContent = newType;
                    typeTag.className = 'tag'; // Reseta as classes
                    if(newType === 'Atleta') typeTag.classList.add('tag-atleta');
                    if(newType === 'Clube') typeTag.classList.add('entity-club');

                     // Atualiza a tag de Status
                    const statusTag = currentRowEditing.querySelector('.user-status .tag');
                    statusTag.textContent = newStatus;
                    statusTag.className = 'tag'; // Reseta as classes
                    if(newStatus === 'Ativo') statusTag.classList.add('tag-ativo');
                    if(newStatus === 'Inativo') statusTag.classList.add('tag-inativo');

                    closeModal(editModal);
                    currentRowEditing = null;
                }
            });
        }
        
        // Ação de Cancelar
        if(cancelEditBtn) cancelEditBtn.addEventListener('click', () => { currentRowEditing = null; closeModal(editModal); });
    }


    // Fecha qualquer modal ao clicar fora
    window.addEventListener('click', (event) => {
        closeAllDropdowns();
        if (event.target.classList.contains('modal-overlay')) {
            closeModal(event.target);
        }
    });
});