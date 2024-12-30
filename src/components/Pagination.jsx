import classes from "../pages/style.module.css";
import InputButton from "./ui/button/InputButton";

export default function Pagination({currentPage, onPrevious, onNext, isNextDisabled}) {
    return (
        <div className={classes.pagination}>
            <InputButton onClick={onPrevious} disabled={currentPage === 1}>
                Previous
            </InputButton>
            <span className={classes.pageNumber}>{currentPage}</span>
            <InputButton onClick={onNext} disabled={isNextDisabled}>
                Next
            </InputButton>
        </div>
    )
}