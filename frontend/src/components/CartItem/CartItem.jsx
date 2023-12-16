import Stack from "@mui/material/Stack";
import classes from "./CartItem.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
const CartItem = ({ album_image, title, price }) => {
  return (
    <Stack
      direction="row"
      flexItem
      height="6rem"
      marginTop="1rem"
      bgcolor="	#202020"
      borderRadius="5px"
      marginRight="2rem"
    >
      <Stack>
        <img
          src={album_image}
          style={{
            height: "100%", // Take full height of the cart item
            width: "100%", // Set width to 20% of the cart item
            objectFit: "fit", // Preserve aspect ratio and cover the entire width
            marginRight: "3rem", // Add some margin between the image and text
            borderRadius: "5px 0px 0px 5px", // Rounded corners on the left side
          }}
          alt={title}
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        padding="2rem"
      >
        <p className={classes.title}>{title}</p>
        <div className={classes.priceSection}>
          <p className={classes.priceText}>${price}</p>
          <IconButton aria-label="delete">
            <DeleteIcon style={{color:"white"}} className={classes.trashIcon} />
          </IconButton>
        </div>
      </Stack>
    </Stack>
  );
};

export default CartItem;
