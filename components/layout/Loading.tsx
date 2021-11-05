import Image from "next/image";
import classes from "./Loading.module.css";

export const Loading = () => {
    return (
        <div className={classes.container}>
            <Image
                src="img/codeleap-logo-black.png"
                alt="Codeleap Logo Black"
            />
        </div>
    );
};
