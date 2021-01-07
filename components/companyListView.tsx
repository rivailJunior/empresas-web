import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
  })
);

export type CompanyList = {
  values: [any];
};

export function ListView<CompanyList>({ values }): JSX.Element {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {values && values.length ? (
        values.map((company, index) => {
          return (
            <React.Fragment key={index}>
              <Link href={`/company/${company.id}`}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={company.enterprise_name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {company.city} - {company.country} -
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              </Link>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          );
        })
      ) : (
        <React.Fragment />
      )}
    </List>
  );
}
