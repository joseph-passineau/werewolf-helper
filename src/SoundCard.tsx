import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
    imageSrc: string,
    title: string,
    description: string,
    onClick: () => void
}

export const SoundCard = (props: Props) => {
    return (
      <Card>
        <CardActionArea sx={{ display: 'flex', justifyContent: 'start' }} onClick={props.onClick}>
          <CardMedia
            sx={{ width: 100, height: 100 }}
            component="img"
            image={props.imageSrc}
          />         
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">{props.title}</Typography>
            <Typography variant="body2" color="text.secondary">{props.description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }