import { List, ListItem, Link, Typography, Zoom } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const DepartmentsList = ({ novaPostaData }) => {
    const { info, data } = novaPostaData;

    return (
        <>
            {/* {errors && `Something went wrong: ${errors}`} */}
            {info?.totalCount === 0 && "У цьому місті відділень немає..."}

            {info?.totalCount === 1 && (
                <Typography variant='subtitle1' color='textSecondary' mt={2}>
                    Знайдено відділеня:
                </Typography>
            )}

            {info?.totalCount > 1 && (
                <Typography variant='subtitle1' color='textSecondary' mt={2}>
                    Знайдено {info.totalCount} відділень та поштоматів
                </Typography>
            )}
            <List>
                {data?.map((department) => (
                    <Zoom in key={department.SiteKey}>
                        <ListItem>
                            <Typography width='100%'>
                                {department.Description}
                            </Typography>
                            <Link
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    department.Description
                                )}`}
                                target='_blank'
                                rel='noopener noreferrer'
                                sx={{
                                    color: "inherit",
                                    marginRight: { md: "40px" },
                                }}
                            >
                                <LocationOnIcon />
                            </Link>
                        </ListItem>
                    </Zoom>
                ))}
            </List>
        </>
    );
};

export default DepartmentsList;
