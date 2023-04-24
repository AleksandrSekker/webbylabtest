import { createSlice } from '@reduxjs/toolkit'

interface ModalState {
    isOpen: boolean
    modalType: string
}

const initialState: ModalState = {
  isOpen: false,
  modalType: '',
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.modalType = action.payload
    },
    closeModal: (state) => {
      state.isOpen = false
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
