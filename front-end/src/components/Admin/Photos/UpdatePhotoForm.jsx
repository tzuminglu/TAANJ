import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import ErrorText from '../../General/ErrorText';
import useUploadImage from '../../../hooks/useUploadImage';

import axiosClient from '../../../axios/config';

import { PhotoIcon } from "@heroicons/react/24/solid";

const validImageTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const formURL = "/admin/photos";
const imageURL = "/admin/photos/photoUpload";
const deleteURL = "admin/photos";

function UpdatePhotoForm({photo}) {
  return (
    <div>UpdatePhotoForm</div>
  )
}

export default UpdatePhotoForm