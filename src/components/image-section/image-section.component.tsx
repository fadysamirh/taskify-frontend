import { FC } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

type Props = {};

export const ImageSectionComponent: FC<Props> = ({}) => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "10vw",
      marginTop: "15vw",
      marginBottom: "7vw",
      "@media (max-width: 768px)": {
        flexDirection: "column",
        marginBottom: 0,
      },
    },
    typographyContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "4vw",
      borderLeft: "3px solid #000",
      paddingLeft: "2vw",
    },
    spaceBetweenColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "20vw",
    },
  };
  return (
    <Box sx={styles.container}>
      <Image
        src={"/image-section.jpg"}
        alt={"Task Management"}
        width={640}
        height={360}
      />
      <Box style={styles.spaceBetweenColumn}>
        <Box sx={styles.typographyContainer}>
          <Typography variant={"h3"}>Task Management</Typography>
          <Typography>Organize and track tasks efficiently</Typography>
        </Box>
        <Box sx={styles.typographyContainer}>
          <Typography variant={"h3"}>Deadline Management</Typography>
          <Typography>Set deadlines and priorities for tasks</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default ImageSectionComponent;
