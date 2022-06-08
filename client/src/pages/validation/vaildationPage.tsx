import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Title } from "../../models";
import { Header, SpinnerIcon } from "../../components";
import { ValidationTable } from "../../components/table/validationTable";
import { titlesUrl } from "../../config";
import { get } from "../../requests";

export const ValidationPage = () => {
  const { titleId } = useParams();
  const [title, setTitle] = useState<Title>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    setShowSpinner(true);
    get(`${titlesUrl}/${titleId}`).then((data) => {
      setTitle(data);
      setShowSpinner(false);
    });
    
  }, []);

  const updateSpinnerStatus = (show: boolean) => setShowSpinner(show)

  return (
    <>
      <Header isButtonEnabled={false} />
      <SpinnerIcon showSpinner={showSpinner} />
      {title ? <ValidationTable title={title} updateSpinner={updateSpinnerStatus} /> : <></>}
    </>
  );
};
